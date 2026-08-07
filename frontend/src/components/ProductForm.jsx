// ProductForm.js
import { useState } from 'react';

const emptyForm = {
	name: '',
	description: '',
	price: '',
	category: '',
	imageUrl: '',
};

export default function ProductForm({ initialProduct, buttonLabel = 'Submit', onSubmit }) {
	const [formData, setFormData] = useState(
		initialProduct
			? {
					name: initialProduct.name,
					description: initialProduct.description,
					price: initialProduct.price,
					category: initialProduct.category,
					imageUrl: initialProduct.imageUrl,
				}
			: emptyForm
	);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, description, price, category } = formData;
		if (!name.trim() || !description.trim() || !price || !category.trim()) {
			alert('Please fill in all required fields');
			return;
		}
		if (Number(price) < 1) {
			alert('Price must be at least 1');
			return;
		}
		await onSubmit(formData);
		if (!initialProduct) {
			setFormData(emptyForm);
		}
	}

	return (
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
			<button type="submit">{buttonLabel}</button>
		</form>
	);
}
