// MyListings.js
import { useEffect, useState } from 'react';
import api from '../api';
import ProductForm from './ProductForm.jsx';

export default function MyListings() {
	const [products, setProducts] = useState([]);
	const [editingProduct, setEditingProduct] = useState(null);
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [search, setSearch] = useState('');

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		setLoading(true);
		setError('');
		try {
			const response = await api.get('/product/mine');
			setProducts(response.data);
		} catch (error) {
			console.error('Error:', error);
			setError('Unable to load listings. Please make sure the server is running and try again.');
		} finally {
			setLoading(false);
		}
	}

	const handleEdit = (product) => {
		setEditingProduct(product);
		setMessage('');
	}

	const handleUpdate = async (formData) => {
		try {
			const response = await api.put(
				`/product/${editingProduct._id}`,
				formData
			);
			setMessage(`Updated "${response.data.name}"`);
			setEditingProduct(null);
			fetchProducts();
		} catch (error) {
			console.error('Error:', error);
			setMessage('Failed to update product. Please try again.');
		}
	}

	const handleDelete = async (id, name) => {
		if (!window.confirm(`Delete "${name}"?`)) {
			return;
		}
		try {
			await api.delete(`/product/${id}`);
			setMessage(`Deleted "${name}"`);
			setEditingProduct(null);
			fetchProducts();
		} catch (error) {
			console.error('Error:', error);
			setMessage('Failed to delete product. Please try again.');
		}
	}

	const handleCancelEdit = () => {
		setEditingProduct(null);
		setMessage('');
	}

	const query = search.trim().toLowerCase();
	const filteredProducts = products.filter((p) =>
		!query ||
		(p.name || '').toLowerCase().includes(query) ||
		(p.description || '').toLowerCase().includes(query) ||
		(p.category || '').toLowerCase().includes(query)
	);

	return (
		<div>
			<h2>My Listings</h2>
			{editingProduct && (
				<div>
					<h3>Edit "{editingProduct.name}"</h3>
					<ProductForm
						initialProduct={editingProduct}
						buttonLabel="Save Changes"
						onSubmit={handleUpdate}
					/>
					<button type="button" onClick={handleCancelEdit}>
						Cancel
					</button>
				</div>
			)}
			{message && <p>{message}</p>}
			{!loading && !error && (
				<input
					type="search"
					className="search-bar"
					placeholder="Search my listings..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			)}
			{loading ? (
				<p>Loading listings...</p>
			) : error ? (
				<>
					<p>{error}</p>
					<button onClick={fetchProducts}>Retry</button>
				</>
			) : filteredProducts.length === 0 ? (
				<p>{query ? `No listings match "${search}".` : 'You have no listings yet. Head to "Become a Seller" to add your first product!'}</p>
			) : (
			<div className="product-list">
				{filteredProducts.map((product) => (
					<div key={product._id} className="product">
						<h3>{product.name}</h3>
						<img src={product.imageUrl}
							alt={product.name} className="product-image" />
						<p className="product-description">
							Description: {product.description}
						</p>
						<p className="product-price">
							Price: ${product.price}
						</p>
						<p className="product-category">
							Category: {product.category}
						</p>
						<button onClick={() => handleEdit(product)}>Edit</button>
						<button onClick={() => handleDelete(product._id, product.name)}>
							Delete
						</button>
					</div>
				))}
			</div>
			)}
		</div>
	);
}
