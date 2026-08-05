const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Helper to sign a JWT for a user
const signToken = (user) => {
	return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN || '30d'
	});
};

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({ message: 'Please provide name, email, and password' });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const user = await User.create({ name, email, password });
		const token = signToken(user);

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token
		});
	} catch (err) {
		next(err);
	}
});

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: 'Please provide email and password' });
		}

		const user = await User.findOne({ email });
		if (!user || !(await user.matchPassword(password))) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}

		const token = signToken(user);

		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token
		});
	} catch (err) {
		next(err);
	}
});

// GET /api/auth/me
router.get('/me', protect, (req, res) => {
	res.json({
		_id: req.user._id,
		name: req.user.name,
		email: req.user.email
	});
});

module.exports = router;