// Seller.js
import { useState } from 'react';
import api from '../api';
import ProductForm from './ProductForm.jsx';

export default function Seller() {
	const [message, setMessage] = useState('');

	const handleAdd = async (formData) => {
		try {
			const response = await api.post('/product', formData);
			setMessage(`Added "${response.data.name}"`);
		} catch (error) {
			console.error('Error:', error);
			setMessage('Failed to add product. Please try again.');
		}
	}

	return (
		<div>
			<h2>Become a Seller</h2>
			<ProductForm buttonLabel="Add Product" onSubmit={handleAdd} />
			{message && <p>{message}</p>}
		</div>
	);
}
