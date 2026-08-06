// ProductList.js
import { useEffect, useState } from 'react';
import api from '../api';

export default function ProductList({ onAddToCart }) {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [filter, setFilter] = useState('all');

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		setLoading(true);
		setError('');
		try {
			const response = await api.get('/product');
			setProducts(response.data);
		} catch (error) {
			console.error('Error:', error);
			setError('Unable to load products. Please make sure the server is running and try again.');
		} finally {
			setLoading(false);
		}
	}

	const categories = [...new Set(products.map((p) => p.category).filter(Boolean))].sort();
	const filteredProducts = filter === 'all' ? products : products.filter((p) => p.category === filter);

	if (loading) {
		return (
			<div className="container">
				<h2>Products</h2>
				<p>Loading products...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container">
				<h2>Products</h2>
				<p>{error}</p>
				<button onClick={fetchProducts}>Retry</button>
			</div>
		);
	}

	return (
		<div className="container">
			<h2>Products</h2>
			{categories.length > 0 && (
				<div className="category-filter">
					<label htmlFor="category">Filter by category: </label>
					<select id="category" value={filter} onChange={(e) => setFilter(e.target.value)}>
						<option value="all">All categories</option>
						{categories.map((category) => (
							<option key={category} value={category}>{category}</option>
						))}
					</select>
				</div>
			)}
			{filteredProducts.length === 0 ? (
				<p>No products yet. Be the first to sell something!</p>
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
							<p className="product-owner">
								Seller: {product.owner?.name || 'Unknown'}
							</p>
							<button onClick={() => onAddToCart(product)}>Add to cart</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
