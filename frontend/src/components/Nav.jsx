// Nav.js
import { Link } from 'react-router';

const Nav = () => {
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
			</ul>
		</nav>
	);
}

export default Nav;
