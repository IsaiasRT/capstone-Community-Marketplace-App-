// context/AuthContext.jsx
// Provides global authentication state (user, token, loading) and
// register/login/logout actions. Uses localStorage to persist the JWT.
import { useEffect, useState } from 'react';
import api from '../api';
import { AuthContext } from './authContext.js';

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(() => localStorage.getItem('token'));
	const [loading, setLoading] = useState(true);

	// On mount / token change, fetch the current user to restore the session
	useEffect(() => {
		if (!token) {
			setLoading(false);
			return;
		}
		const fetchMe = async () => {
			try {
				const response = await api.get('/api/auth/me');
				setUser(response.data);
			} catch (error) {
				console.error('Session check failed:', error);
				logout();
			} finally {
				setLoading(false);
			}
		};
		fetchMe();
	}, [token]);

	const register = async (name, email, password) => {
		const response = await api.post('/api/auth/register', { name, email, password });
		setToken(response.data.token);
		setUser(response.data);
		localStorage.setItem('token', response.data.token);
	};

	const login = async (email, password) => {
		const response = await api.post('/api/auth/login', { email, password });
		setToken(response.data.token);
		setUser(response.data);
		localStorage.setItem('token', response.data.token);
	};

	const logout = () => {
		localStorage.removeItem('token');
		setToken(null);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}