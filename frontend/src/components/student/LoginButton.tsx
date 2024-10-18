import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { apiBaseUrl } from '@/utils/apiBase';
import { decodeToken } from '@/utils/jwtDecode';

const LoginButton: React.FC = () => {
	const navigate = useNavigate();

	const handleLogin = () => {
		const backendLoginUrl = `${apiBaseUrl}/api/auth/student/login`;
		window.location.href = backendLoginUrl;
	};

	React.useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get('token');
		if (token) {
			localStorage.setItem('token', token);
			console.log('Token:', token); // Kiểm tra token đã lưu
			const payload = decodeToken(token);
			console.log('Decoded Payload:', payload); // Kiểm tra payload đã giải mã
			navigate('/student');
		}
	}, [navigate]);

	return (
		<Button type="primary" onClick={handleLogin}>
			Login with Google
		</Button>
	);
};

export default LoginButton;
