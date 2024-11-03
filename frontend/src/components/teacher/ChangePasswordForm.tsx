import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Spin, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { changeTeacherPassword } from '@/services/api/teacher';

const { Title } = Typography;

const ChangePasswordForm: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const email = localStorage.getItem('teacherEmail');
		if (!email) {
			message.error('Không tìm thấy email giáo viên!');
			setLoading(false);
		} else {
			setLoading(false);
		}
	}, []);

	const onFinish = async (values: {
		currentPassword: string;
		newPassword: string;
		confirmPassword: string;
		email: string;
	}) => {
		setLoading(true);
		try {
			const storedEmail = localStorage.getItem('teacherEmail');

			if (values.email !== storedEmail) {
				message.error('Email không khớp với email của bạn!');
				return;
			}

			await changeTeacherPassword(
				values.email,
				values.currentPassword,
				values.newPassword,
			);
			message.success('Đổi mật khẩu thành công!');
			localStorage.removeItem('teacherToken');
			localStorage.removeItem('teacherEmail');
			navigate('/teacher/login');
		} catch (err) {
			if (err && typeof err === 'object' && 'response' in err) {
				const responseError = err as {
					response: { data: { message: string } };
				};
				const errorMessage = responseError.response.data.message;
				if (errorMessage === 'Current password is incorrect!') {
					message.error('Mật khẩu hiện tại không chính xác!');
				} else {
					message.error('Cập nhật thất bại. Vui lòng thử lại!');
				}
			} else if (err instanceof Error) {
				message.error(err.message);
			} else {
				message.error('Có lỗi xảy ra. Vui lòng thử lại!');
			}
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div style={{ textAlign: 'center', marginTop: '100px' }}>
				<Spin size="large" />
			</div>
		);
	}

	return (
		<div style={{ padding: '90px 0 50px 0' }}>
			<Row>
				<Col span={24}>
					<Form
						name="changePassword"
						onFinish={onFinish}
						layout="vertical"
						style={{
							maxWidth: 500,
							margin: '0 auto',
							padding: '30px',
							boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
							borderRadius: '8px',
							backgroundColor: '#f5f5f5',
						}}
					>
						<div style={{ textAlign: 'center' }}>
							<Title level={2}>Đổi mật khẩu</Title>
							<Title level={3} style={{ fontFamily: 'cursive', margin: 0 }}>
								ligevan
							</Title>
						</div>

						<Form.Item
							label="Email"
							name="email"
							rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
						>
							<Input placeholder="Nhập email" />
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
							label="Nhập lại mật khẩu mới"
							name="confirmPassword"
							dependencies={['newPassword']}
							rules={[
								{ required: true, message: 'Vui lòng nhập lại mật khẩu mới!' },
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('newPassword') === value) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error('Mật khẩu nhập lại không khớp!'),
										);
									},
								}),
							]}
						>
							<Input.Password placeholder="Nhập lại mật khẩu mới" />
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								loading={loading}
								style={{
									width: '100%',
									backgroundColor: 'black',
								}}
								icon={<EditOutlined />}
							>
								Đổi Mật Khẩu
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</div>
	);
};

export default ChangePasswordForm;
