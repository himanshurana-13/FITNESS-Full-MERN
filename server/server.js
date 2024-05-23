const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./rotues/auth');

const app = express();
const PORT = 5000;

// Update MongoDB URL
const mongoDBURL = 'mongodb://localhost:27017/mern-login'; // Update this with your desired URL

// Connect to MongoDB
mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on ${mongoDBURL}`);
});
