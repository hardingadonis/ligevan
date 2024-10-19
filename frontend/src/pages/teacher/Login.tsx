import {
	selectEmail,
	selectToken,
	setAvatar,
	setEmail,
	setToken,
} from '../../slices/teacher';
import { Button, Col, Form, Input, Modal, Row, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { apiBaseUrl } from '@/utils/apiBase';

const { Title } = Typography;

const LoginTeacher: React.FC = () => {
	const token = useSelector(selectToken);
	const email = useSelector(selectEmail);

	const navigate = useNavigate();

	useEffect(() => {
		if (!token && !email) {
			navigate('../teacher/login');
		}
	}, [token, email, navigate]);

	const [isMounted, setIsMounted] = useState(false);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const dispatch = useDispatch();

	useEffect(() => {
		const token = localStorage.getItem('teacherToken');
		if (token) {
			navigate('/teacher');
		}
	}, [navigate]);

	const onFinish = async (values: { email: string; password: string }) => {
		setLoading(true);
		try {
			const response = await axios.post(
				apiBaseUrl + '/api/auth/teacher/login',
				{
					email: values.email,
					password: values.password,
				},
			);

			const responseAvatar = await axios.get(
				apiBaseUrl + `/api/teachers/email/${values.email}`,
			);

			if (responseAvatar.data.avatar) {
				dispatch(setAvatar(responseAvatar.data.avatar));
			}

			dispatch(setToken(response.data.access_token));
			dispatch(setEmail(values.email));
			localStorage.setItem('teacherToken', response.data.access_token);
			localStorage.setItem('teacherEmail', values.email);

			navigate('/teacher');
		} catch (error: any) {
			setError('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
			console.error(
				'Error logging in:',
				error.response ? error.response.data : error.message,
			);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}
	const handleCloseError = () => {
		setError(null);
	};

	return (
		<Row justify="center" align="middle" style={{ height: '100vh' }}>
			<Col xs={22} sm={18} md={12} lg={8}>
				<div
					style={{
						backgroundColor: '#fff',
						padding: '32px',
						borderRadius: '8px',
						boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
					}}
				>
					<div style={{ flex: 1, textAlign: 'center' }}>
						<Title
							level={3}
							style={{
								margin: 0,
								fontFamily: 'cursive',
								color: 'black',
								backgroundColor: '#fff',
								padding: '8px 0',
							}}
						>
							ligevan
						</Title>
					</div>

					<Title
						level={2}
						style={{ textAlign: 'center', marginBottom: '24px' }}
					>
						Đăng nhập
					</Title>

					<Form
						name="login"
						initialValues={{ remember: true }}
						onFinish={onFinish}
						layout="vertical"
					>
						<Form.Item
							label="Email"
							name="email"
							rules={[
								{ required: true, message: 'Vui lòng nhập email của bạn!' },
							]}
						>
							<Input placeholder="Nhập email" />
						</Form.Item>

						<Form.Item
							label="Mật khẩu"
							name="password"
							rules={[
								{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' },
							]}
						>
							<Input.Password placeholder="Nhập mật khẩu" />
						</Form.Item>

						<Form.Item>
							<Button
								color="default"
								variant="solid"
								type="primary"
								htmlType="submit"
								loading={loading}
								block
								style={{ marginTop: '16px' }}
							>
								Đăng Nhập
							</Button>
						</Form.Item>
					</Form>
				</div>

				{error && (
					<Modal
						title="Đăng nhập thất bại"
						visible={!!error}
						onCancel={handleCloseError}
						footer={[
							<Button
								key="ok"
								onClick={handleCloseError}
								color="default"
								variant="solid"
							>
								OK
							</Button>,
						]}
					>
						<p>{error}</p>
					</Modal>
				)}
			</Col>
		</Row>
	);
};

export default LoginTeacher;
