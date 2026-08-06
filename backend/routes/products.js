const express = require('express');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Route to fetch products
router.get('/', async (req, res, next) => {
	try {
		const products = await Product.find().populate('owner', 'name email _id');
		res.json(products);
	} catch (err) {
		next(err);
	}
});

// Route to fetch the authenticated user's products (protected)
router.get('/mine', protect, async (req, res, next) => {
	try {
		const products = await Product.find({ owner: req.user._id }).populate('owner', 'name email _id');
		res.json(products);
	} catch (err) {
		next(err);
	}
});

// Route to add new product (protected)
router.post('/', protect, async (req, res, next) => {
	try {
		const { name, description, price, category, imageUrl } = req.body;
		const newProduct = new Product({
			name,
			description,
			price,
			category,
			imageUrl,
			owner: req.user._id,
		});
		const savedProduct = await newProduct.save();
		const populated = await savedProduct.populate('owner', 'name email _id');
		res.status(201).json(populated);
	} catch (err) {
		next(err);
	}
});

// Route to update a product (protected)
router.put('/:id', protect, async (req, res, next) => {
	try {
		const { name, description, price, category, imageUrl } = req.body;
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}
		if (product.owner.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: 'Not authorized to edit this product' });
		}
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			{ name, description, price, category, imageUrl },
			{ new: true, runValidators: true }
		);
		res.json(updatedProduct);
	} catch (err) {
		next(err);
	}
});

// Route to delete a product (protected)
router.delete('/:id', protect, async (req, res, next) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}
		if (product.owner.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: 'Not authorized to delete this product' });
		}
		await Product.findByIdAndDelete(req.params.id);
		res.json({ message: 'Product deleted' });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
