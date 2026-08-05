const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: String,
	price: {
		type: Number,
		required: true
	},
	category: String,
	imageUrl: String, // Directly store image URL
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

module.exports = mongoose.model('Product', productSchema);
