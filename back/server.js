const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
require('dotenv').config();

// Route imports
const authRoutes = require('./routes/authRoutes');
const founderRoutes = require('./routes/founderRoutes');
const investorRoutes = require('./routes/investorRoutes');
const adminRoutes = require('./routes/adminRoutes');
const startupRoutes = require('./routes/startupRoutes');

// Error handlers
const { errorHandler } = require('./utils/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/founders', founderRoutes);
app.use('/api/investors', investorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/startups', startupRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Startup Platform API',
    description: 'A community platform for startup growth and investment'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});