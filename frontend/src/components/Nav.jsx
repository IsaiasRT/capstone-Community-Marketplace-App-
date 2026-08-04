// Nav.js
import { Link } from 'react-router'

export default function Nav({ cartCount }) {
	return (
		<nav className="navbar">
			<h1 className="navbar-brand">
				Marketplace
			</h1>
			<ul className="nav-links">
				<li className="nav-item">
					<Link to="/" className="nav-link">
						Home
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/seller" className="nav-link">
						Become a Seller
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/my-listings" className="nav-link">
						My Listings
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/cart" className="nav-link">
						Cart {cartCount > 0 && `(${cartCount})`}
					</Link>
				</li>
			</ul>
		</nav>
	);
}
