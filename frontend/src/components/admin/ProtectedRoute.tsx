import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
	children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const accessToken = localStorage.getItem('accessToken');

	if (!accessToken || accessToken === 'undefined') {
		return <Navigate to="/admin/login" replace />;
	}

	return children;
};

export default ProtectedRoute;
