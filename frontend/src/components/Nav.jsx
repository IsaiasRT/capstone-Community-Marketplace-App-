// Nav.js
import { Link } from 'react-router';
import { useAuth } from '../context/useAuth';

export default function Nav({ cartCount, theme, onToggleTheme }) {
	const { user, logout } = useAuth();

	return (
		<nav className="navbar">
			<h1 className="navbar-brand">Community Marketplace</h1>
			<ul className="nav-links">
				<li className="nav-item">
					<button className="nav-link nav-button theme-toggle" onClick={onToggleTheme} title="Toggle light/dark theme">
						{theme === 'dark' ? 'Light' : 'Dark'}
					</button>
				</li>
				<li className="nav-item">
					<Link to="/" className="nav-link">
						Home
					</Link>
				</li>
				{user && (
					<>
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
					</>
				)}
				<li className="nav-item">
					<Link to="/cart" className="nav-link">
						Cart {cartCount > 0 && `(${cartCount})`}
					</Link>
				</li>
				{user ? (
					<li className="nav-item">
						<span className="nav-user">{user.name}</span>
						<button className="nav-link nav-button" onClick={logout}>
							Logout
						</button>
					</li>
				) : (
					<>
						<li className="nav-item">
							<Link to="/login" className="nav-link">
								Log In
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/register" className="nav-link">
								Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}