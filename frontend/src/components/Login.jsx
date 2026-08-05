// Login.js
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/useAuth';

export default function Login() {
	const { login } = useAuth();
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [message, setMessage] = useState('');
	const navigate = useNavigate();
	const location = useLocation();
	// Redirect back to the page the user was trying to visit, or home
	const from = location.state?.from?.pathname || '/';

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage('');
		try {
			await login(formData.email, formData.password);
			navigate(from, { replace: true });
		} catch (error) {
			console.error('Login failed:', error);
			setMessage(error.response?.data?.message || 'Login failed. Please try again.');
		}
	};

	return (
		<div className="container">
			<h2>Log In</h2>
			<form onSubmit={handleSubmit}>
				<input
					className="form-input"
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<input
					className="form-input"
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<button className="form-submit" type="submit">Log In</button>
			</form>
			{message && <p>{message}</p>}
			<p>
				Don&apos;t have an account? <Link to="/register">Register</Link>
			</p>
		</div>
	);
}