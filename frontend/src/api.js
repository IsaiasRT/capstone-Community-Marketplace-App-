// api.js
// Shared axios instance that attaches the JWT token to every request.
import axios from 'axios';

const api = axios.create({
	baseURL: 'https://capstone-community-marketplace-app.onrender.com',
});

// Request interceptor: add Authorization header if a token exists
api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default api;