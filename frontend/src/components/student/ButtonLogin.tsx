import { LoginOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { apiBaseUrl } from '@/utils/apiBase';

const ButtonLogin: React.FC = () => {
	const navigate = useNavigate();
	const isMobile = useMediaQuery({ maxWidth: 767 });

	const handleLogin = () => {
		const backendLoginUrl = `${apiBaseUrl}/api/auth/student/login`;
		window.location.href = backendLoginUrl;
	};

	React.useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get('token');
		if (token) {
			localStorage.setItem('token', token);
			navigate('/student');
		}
	}, [navigate]);

	return (
		<Button
			type="primary"
			onClick={handleLogin}
			icon={isMobile ? <LoginOutlined /> : null}
		>
			{!isMobile && 'Đăng nhập'}
		</Button>
	);
};

export default ButtonLogin;
