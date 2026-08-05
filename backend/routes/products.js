const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Route to fetch products
router.get('/', async (req, res, next) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err) {
		next(err);
	}
});

// Route to add new product
router.post('/', async (req, res, next) => {
	try {
		const { name, description, price, category, imageUrl } = req.body;
		const newProduct = new Product({
			name,
			description,
			price,
			category,
			imageUrl,
		});
		const savedProduct = await newProduct.save();
		res.status(201).json(savedProduct);
	} catch (err) {
		next(err);
	}
});

// Route to update a product
router.put('/:id', async (req, res, next) => {
	try {
		const { name, description, price, category, imageUrl } = req.body;
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			{ name, description, price, category, imageUrl },
			{ new: true, runValidators: true }
		);
		if (!updatedProduct) {
			return res.status(404).json({ message: 'Product not found' });
		}
		res.json(updatedProduct);
	} catch (err) {
		next(err);
	}
});

// Route to delete a product
router.delete('/:id', async (req, res, next) => {
	try {
		const deletedProduct = await Product.findByIdAndDelete(req.params.id);
		if (!deletedProduct) {
			return res.status(404).json({ message: 'Product not found' });
		}
		res.json({ message: 'Product deleted' });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
