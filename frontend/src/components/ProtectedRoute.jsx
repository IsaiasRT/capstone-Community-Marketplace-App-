// ProtectedRoute.js
// Guards a route: redirects to /login when the user is not authenticated.
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/useAuth';

export default function ProtectedRoute({ children }) {
	const { user, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		return <p>Loading...</p>;
	}

	if (!user) {
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	return children;
}