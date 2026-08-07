const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		trim: true
	},
	description: {
		type: String,
		trim: true
	},
	price: {
		type: Number,
		required: [true, 'Price is required'],
		min: [0, 'Price cannot be negative']
	},
	category: {
		type: String,
		trim: true
	},
	imageUrl: {
		type: String,
		trim: true
	}, // Directly store image URL
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

module.exports = mongoose.model('Product', productSchema);
