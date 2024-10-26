import { Button, Col, Form, Input, Row, Typography, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { adminChangePassword } from '@/services/api/admin';

const { Title } = Typography;

export interface ChangePasswordFormValues {
	username: string;
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

const FormChangePassword: React.FC = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const onFinish = async (values: ChangePasswordFormValues) => {
		setLoading(true);
		try {
			await adminChangePassword(values);
			message.success('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
			setTimeout(() => {
				localStorage.clear();
				navigate('/admin/login');
			}, 2000);
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
						errorMessage = 'Mật khẩu hiện tại không chính xác.';
						break;
					default:
						errorMessage = data?.message
							? `Lỗi: Mật khẩu hiện tại không chính xác`
							: errorMessage;
						break;
				}
			}

			message.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
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
					<Title level={2} style={{ textAlign: 'center', marginBottom: '8px' }}>
						Đổi mật khẩu
					</Title>
					<Form name="changePassword" onFinish={onFinish} layout="vertical">
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
							label="Mật khẩu hiện tại"
							name="currentPassword"
							rules={[
								{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' },
							]}
						>
							<Input.Password placeholder="Nhập mật khẩu hiện tại" />
						</Form.Item>
						<Form.Item
							label="Mật khẩu mới"
							name="newPassword"
							dependencies={['currentPassword']}
							rules={[
								{ required: true, message: 'Vui lòng nhập mật khẩu mới!' },
								{ min: 8, message: 'Mật khẩu mới phải có ít nhất 8 ký tự!' },
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('currentPassword') !== value) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error('Mật khẩu mới phải khác mật khẩu hiện tại!'),
										);
									},
								}),
							]}
						>
							<Input.Password placeholder="Nhập mật khẩu mới" />
						</Form.Item>
						<Form.Item
							label="Xác nhận mật khẩu mới"
							name="confirmPassword"
							dependencies={['newPassword']}
							rules={[
								{ required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('newPassword') === value) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error('Mật khẩu xác nhận không khớp!'),
										);
									},
								}),
							]}
						>
							<Input.Password placeholder="Xác nhận mật khẩu mới" />
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
								Đổi Mật Khẩu
							</Button>
						</Form.Item>
					</Form>
				</div>
			</Col>
		</Row>
	);
};

export default FormChangePassword;
