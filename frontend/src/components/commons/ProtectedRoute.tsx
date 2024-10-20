import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
	children: JSX.Element;
	redirectPath: string;
	tokenName: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	children,
	redirectPath,
	tokenName,
}) => {
	const token = localStorage.getItem(tokenName);

	if (!token || token === 'undefined') {
		return <Navigate to={redirectPath} replace />;
	}

	return children;
};

export default ProtectedRoute;
