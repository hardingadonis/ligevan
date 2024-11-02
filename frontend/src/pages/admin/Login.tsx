import { Button, Col, Form, Input, Modal, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AdminLayout from '@/layouts/admin';
import { getAdminByUsername } from '@/services/api/admin';
import { fetchLogin } from '@/services/api/auth';

const { Title } = Typography;

interface LoginFormValues {
	username: string;
	password: string;
}

const AdminLogin: React.FC = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const token = localStorage.getItem('accessToken');
		if (token && token !== 'undefined') {
			navigate('/admin/dashboard');
		}
	}, [navigate]);

	const onFinish = async (values: LoginFormValues) => {
		setLoading(true);
		try {
			const { accessToken } = await fetchLogin(values);
			localStorage.setItem('accessToken', accessToken);
			const adminDetails = await getAdminByUsername(values.username);
			localStorage.setItem('adminFullName', adminDetails.fullName);
			navigate('/admin/dashboard');
		} catch (error: unknown) {
			let errorMessage = 'Đã xảy ra lỗi không xác định. Vui lòng thử lại.';

			if (typeof error === 'object' && error !== null && 'response' in error) {
				const err = error as {
					response: { status: number; data?: { message?: string } };
				};
				const { status, data } = err.response;
				switch (status) {
					case 404:
						errorMessage = `Không tìm thấy tài khoản quản trị viên "${values.username}".`;
						break;
					case 401:
						errorMessage = 'Mật khẩu bạn đã nhập không chính xác.';
						break;
					default:
						errorMessage = data?.message
							? `Lỗi: ${data.message}`
							: errorMessage;
						break;
				}
			}

			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const handleCloseError = () => {
		setError(null);
	};

	return (
		<AdminLayout showSidebar={false}>
			<Row
				justify="center"
				align="middle"
				style={{ padding: '20px 0', minHeight: '60vh' }}
			>
				<Col xs={22} sm={18} md={12} lg={8}>
					<div
						style={{
							backgroundColor: '#fff',
							padding: '24px',
							borderRadius: '8px',
							boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
						}}
					>
						<div style={{ textAlign: 'center', marginBottom: '8px' }}>
							<Title
								level={3}
								style={{
									margin: '4px 0',
									fontFamily: 'cursive',
									color: 'black',
									backgroundColor: '#fff',
									padding: '2px 0',
								}}
							>
								ligevan
							</Title>
						</div>
						<Title
							level={2}
							style={{ textAlign: 'center', marginBottom: '8px' }}
						>
							Đăng nhập
						</Title>
						<Form name="login" onFinish={onFinish} layout="vertical">
							<Form.Item
								label="Tên đăng nhập"
								name="username"
								rules={[
									{ required: true, message: 'Vui lòng nhập tên đăng nhập!' },
								]}
							>
								<Input placeholder="Nhập tên đăng nhập" />
							</Form.Item>
							<Form.Item
								label="Mật khẩu"
								name="password"
								rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
							>
								<Input.Password placeholder="Nhập mật khẩu" />
							</Form.Item>
							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									loading={loading}
									block
									style={{
										marginTop: '8px',
										backgroundColor: 'black',
										borderColor: 'black',
									}}
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
									style={{
										backgroundColor: 'black',
										borderColor: 'black',
										color: 'white',
									}}
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
		</AdminLayout>
	);
};

export default AdminLogin;
