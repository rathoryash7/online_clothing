const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();

// Middleware
// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/discounts', require('./routes/discounts'));
app.use('/api/payment', require('./routes/payment'));

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  // Try multiple possible paths for the build directory
  const possiblePaths = [
    path.join(__dirname, '../frontend/build'), // Relative to backend/index.js
    path.join(process.cwd(), 'frontend/build'), // From project root
    path.join(process.cwd(), 'build'), // If build is in root
  ];
  
  let buildPath = null;
  
  // Find the first existing build path
  for (const testPath of possiblePaths) {
    if (fs.existsSync(testPath) && fs.existsSync(path.join(testPath, 'index.html'))) {
      buildPath = testPath;
      console.log(`Found build directory at: ${buildPath}`);
      break;
    }
  }
  
  if (buildPath) {
    app.use(express.static(buildPath));
    
    // Serve React app for all non-API routes (this must be after API routes)
    app.get('*', (req, res) => {
      res.sendFile(path.join(buildPath, 'index.html'));
    });
    console.log('✅ Frontend build directory found and configured');
  } else {
    console.error('❌ Frontend build directory not found at any of these paths:');
    possiblePaths.forEach(p => console.error(`   - ${p}`));
    console.warn('⚠️  Serving API only. Frontend will not be available.');
    app.get('/', (req, res) => {
      res.json({ 
        message: 'API is running. Frontend build not found.',
        hint: 'Check build logs to ensure React build completed successfully.'
      });
    });
  }
}

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('ERROR: MONGODB_URI environment variable is not set!');
  console.error('Please set MONGODB_URI in your Render environment variables.');
} else {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.error('Please check your MONGODB_URI in Render environment variables.');
  });
}

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

