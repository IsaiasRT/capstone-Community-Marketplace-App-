// middleware/errorHandler.js
// Centralized error handling middleware for the Express app.

// 404 handler for routes that don't match anything
const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

// General error handler (must have 4 params to be recognized as error middleware)
const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode && res.statusCode !== 200
		? res.statusCode
		: 500;
	res.status(statusCode).json({
		message: err.message || 'Server Error',
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
};

module.exports = { notFound, errorHandler };