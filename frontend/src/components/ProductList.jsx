// ProductList.js
import { useEffect, useState } from 'react';
import api from '../api';

export default function ProductList({ onAddToCart }) {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [filter, setFilter] = useState('all');
	const [sort, setSort] = useState('none');
	const [search, setSearch] = useState('');

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

	const query = search.trim().toLowerCase();
	const filteredProducts = products.filter((p) => {
		const matchesCategory = filter === 'all' || p.category === filter;
		const matchesSearch =
			!query ||
			(p.name || '').toLowerCase().includes(query) ||
			(p.description || '').toLowerCase().includes(query) ||
			(p.category || '').toLowerCase().includes(query);
		return matchesCategory && matchesSearch;
	}).sort((a, b) => {
		if (sort === 'low') return a.price - b.price;
		if (sort === 'high') return b.price - a.price;
		return 0;
	});

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
			<input
				type="search"
				className="search-bar"
				placeholder="Search products..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
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
			<div className="category-filter">
				<label htmlFor="sort">Sort by price: </label>
				<select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
					<option value="none">Default</option>
					<option value="low">Price: Low to High</option>
					<option value="high">Price: High to Low</option>
				</select>
			</div>
			{filteredProducts.length === 0 ? (
				<p>{query ? `No products match "${search}".` : 'No products yet. Be the first to sell something!'}</p>
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
