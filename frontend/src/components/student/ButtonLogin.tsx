import { GoogleOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { apiBaseUrl } from '@/utils/apiBase';

const ButtonLogin: React.FC = () => {
	const navigate = useNavigate();
	const isMobile = useMediaQuery({ maxWidth: 767 });
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleLogin = () => {
		setIsModalVisible(true);
	};

	const handleStudentLogin = () => {
		const backendLoginUrl = `${apiBaseUrl}/api/auth/student/login`;
		window.location.href = backendLoginUrl;
	};

	const handleTeacherLogin = () => {
		navigate('/teacher/login');
	};

	const handleCancel = () => {
		setIsModalVisible(false);
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
		<>
			<Button
				type="primary"
				onClick={handleLogin}
				icon={isMobile ? <LoginOutlined /> : null}
			>
				{!isMobile && 'Đăng nhập'}
			</Button>
			<Modal
				title={<div style={{ textAlign: 'center' }}>Chọn loại đăng nhập</div>}
				visible={isModalVisible}
				onCancel={handleCancel}
				footer={null}
			>
				<Button
					type="primary"
					size="large"
					onClick={handleStudentLogin}
					style={{ width: '100%', marginBottom: '10px' }}
					icon={<GoogleOutlined />}
				>
					Đăng nhập dành cho học sinh
				</Button>
				<Button
					type="primary"
					size="large"
					onClick={handleTeacherLogin}
					style={{ width: '100%' }}
					icon={<UserOutlined />}
				>
					Đăng nhập dành cho giáo viên
				</Button>
			</Modal>
		</>
	);
};

export default ButtonLogin;
