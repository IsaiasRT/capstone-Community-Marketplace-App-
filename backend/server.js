// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.error(err));

// Middleware for CORS
app.use(cors());
// Middleware for parsing JSON bodies
app.use(express.json());

// Routes
app.use('/product', productRoutes);

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
