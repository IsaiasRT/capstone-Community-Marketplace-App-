// Cart.js
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/useAuth.js';

export default function Cart({ cart, onRemove, onRemoveAll, onClear }) {
	const total = cart.reduce(
		(sum, item) => sum + item.product.price * item.quantity, 0
	);
	const { user } = useAuth();
	const navigate = useNavigate();

	const handleCheckout = () => {
		if (!user) {
			alert('Please log in or register to complete your purchase.');
			navigate('/login');
			return;
		}
		onClear();
	};

	return (
		<div className="container">
			<h2>Cart</h2>
			{cart.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<>
					<div className="product-list">
						{cart.map((item) => (
							<div key={item.product._id} className="product">
								<h3>{item.product.name}</h3>
								<img src={item.product.imageUrl}
									alt={item.product.name} className="product-image" />
								<p className="product-price">
									Price: ${item.product.price}
								</p>
								<p className="product-quantity">
									Quantity: {item.quantity}
								</p>
								<button onClick={() => onRemove(item.product._id)}>
									Remove
								</button>
								<button className="form-submit" onClick={() => onRemoveAll(item.product._id)}>
									Remove All
								</button>
							</div>
						))}
					</div>
					<h3>Total: ${total}</h3>
					{user ? (
						<button className="form-submit" onClick={handleCheckout}>
							Checkout
						</button>
					) : (
						<p>
							Please <Link to="/login">log in</Link> or{' '}
							<Link to="/register">register</Link> to checkout.
						</p>
					)}
				</>
			)}
		</div>
	);
}
