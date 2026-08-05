// Register.js
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/useAuth';

export default function Register() {
	const { register } = useAuth();
	const [formData, setFormData] = useState({ name: '', email: '', password: '' });
	const [message, setMessage] = useState('');
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage('');
		try {
			await register(formData.name, formData.email, formData.password);
			navigate(from, { replace: true });
		} catch (error) {
			console.error('Registration failed:', error);
			setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
		}
	};

	return (
		<div className="container">
			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
				<input
					className="form-input"
					type="text"
					name="name"
					placeholder="Name"
					value={formData.name}
					onChange={handleChange}
					required
				/>
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
					placeholder="Password (min 6 characters)"
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<button className="form-submit" type="submit">Register</button>
			</form>
			{message && <p>{message}</p>}
			<p>
				Already have an account? <Link to="/login">Log In</Link>
			</p>
		</div>
	);
}