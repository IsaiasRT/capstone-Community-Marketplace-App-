// Seller.js
import { useState } from 'react';
import axios from 'axios';

const emptyForm = {
	name: '',
	description: '',
	price: '',
	category: '',
	imageUrl: '',
};

export default function Seller() {
	const [formData, setFormData] = useState(emptyForm);
	const [message, setMessage] = useState('');

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:5000/product',
				formData);
			setMessage(`Added "${response.data.name}"`);
			setFormData(emptyForm);
		} catch (error) {
			console.error('Error:', error);
			setMessage('Failed to add product. Please try again.');
		}
	}

	return (
		<div>
			<h2>Become a Seller</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" name="name"
					placeholder="Product Name" value={formData.name}
					onChange={handleChange} />
				<input type="text" name="description"
					placeholder="Description" value={formData.description}
					onChange={handleChange} />
				<input type="number" name="price"
					placeholder="Price" value={formData.price}
					onChange={handleChange} />
				<input type="text" name="category"
					placeholder="Category" value={formData.category}
					onChange={handleChange} />
				<input type="text" name="imageUrl"
					placeholder="Image URL" value={formData.imageUrl}
					onChange={handleChange} />
				<button type="submit">Add Product</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}
