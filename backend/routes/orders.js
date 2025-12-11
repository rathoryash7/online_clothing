const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/orders
// @desc    Create new order
router.post('/', auth, async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, discountCode } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let discountAmount = 0;
    if (discountCode) {
      // Discount validation will be handled separately
      const Discount = require('../models/Discount');
      const discount = await Discount.findOne({ code: discountCode.toUpperCase(), isActive: true });
      if (discount) {
        const itemsPrice = cart.items.reduce((total, item) => {
          return total + (item.product.price * item.quantity);
        }, 0);

        if (itemsPrice >= discount.minPurchase) {
          if (discount.discountType === 'percentage') {
            discountAmount = (itemsPrice * discount.discountValue) / 100;
            if (discount.maxDiscount) {
              discountAmount = Math.min(discountAmount, discount.maxDiscount);
            }
          } else {
            discountAmount = discount.discountValue;
          }
          discount.usedCount += 1;
          await discount.save();
        }
      }
    }

    const itemsPrice = cart.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0) - discountAmount;

    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = itemsPrice * 0.1;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.images[0],
      price: item.product.price,
      size: item.size,
      color: item.color,
      quantity: item.quantity
    }));

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      discountCode: discountCode || undefined,
      discountAmount,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    });

    // Update product stock
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      product.stock -= item.quantity;
      await product.save();
    }

    await order.save();
    cart.items = [];
    cart.discountCode = undefined;
    await cart.save();

    const populatedOrder = await Order.findById(order._id).populate('user', 'name email').populate('orderItems.product');
    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/orders
// @desc    Get user's orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('orderItems.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('orderItems.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

