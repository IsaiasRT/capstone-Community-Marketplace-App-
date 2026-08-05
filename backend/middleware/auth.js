const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify the JWT and attach the authenticated user to req.user
const protect = async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return res.status(401).json({ message: 'Not authorized, no token provided' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// Fetch user (excluding password) and attach to request
		const user = await User.findById(decoded.id).select('-password');
		if (!user) {
			return res.status(401).json({ message: 'Not authorized, user not found' });
		}
		req.user = user;
		next();
	} catch (err) {
		return res.status(401).json({ message: 'Not authorized, token failed' });
	}
};

module.exports = { protect };