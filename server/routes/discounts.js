const express = require('express');
const Discount = require('../models/Discount');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/discounts/validate
// @desc    Validate discount code
router.post('/validate', auth, async (req, res) => {
  try {
    const { code, cartTotal } = req.body;

    const discount = await Discount.findOne({
      code: code.toUpperCase(),
      isActive: true
    });

    if (!discount) {
      return res.status(404).json({ message: 'Invalid discount code' });
    }

    const now = new Date();
    if (now < discount.validFrom || now > discount.validUntil) {
      return res.status(400).json({ message: 'Discount code has expired' });
    }

    if (cartTotal < discount.minPurchase) {
      return res.status(400).json({
        message: `Minimum purchase of $${discount.minPurchase} required`
      });
    }

    if (discount.usageLimit && discount.usedCount >= discount.usageLimit) {
      return res.status(400).json({ message: 'Discount code usage limit reached' });
    }

    let discountAmount = 0;
    if (discount.discountType === 'percentage') {
      discountAmount = (cartTotal * discount.discountValue) / 100;
      if (discount.maxDiscount) {
        discountAmount = Math.min(discountAmount, discount.maxDiscount);
      }
    } else {
      discountAmount = discount.discountValue;
    }

    res.json({
      valid: true,
      discountAmount,
      code: discount.code,
      description: discount.description
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

