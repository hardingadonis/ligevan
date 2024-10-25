import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Teacher } from '@/schemas/teacher.schema';
import { getTeacherByEmail, updateTeacher } from '@/services/api/teacher';

const ChangePasswordForm: React.FC = () => {
	const [teacherData, setTeacherData] = useState<Teacher | null>(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchTeacherData() {
			try {
				const email = localStorage.getItem('teacherEmail');
				if (!email) {
					message.error('Không tìm thấy email giáo viên!');
					return;
				}
				const data = await getTeacherByEmail(email);
				setTeacherData(data);
			} catch (err) {
				console.error('Error fetching teacher data:', err);
			} finally {
				setLoading(false);
			}
		}

		fetchTeacherData();
	}, []);

	const onFinish = async (values: { newPassword: string; email: string }) => {
		setLoading(true);
		try {
			const storedEmail = localStorage.getItem('teacherEmail');

			// Validate the entered email against the stored email
			if (values.email !== storedEmail) {
				message.error('Email không khớp với email của bạn!');
				return;
			}

			if (!teacherData?._id) {
				message.error('Thông tin giáo viên không hợp lệ!');
				return;
			}

			const payload = {
				fullName: teacherData.fullName || '',
				email: teacherData.email || '',
				address: teacherData.address || '',
				avatar: teacherData.avatar || '',
				center: teacherData.center || '',
				classes: teacherData.classes || [],
				dob: teacherData.dob || '',
				gender: teacherData.gender || '',
				phone: teacherData.phone || '',
				password: values.newPassword,
				isDeleted: teacherData.isDeleted || false,
			};

			await updateTeacher(teacherData._id, payload);
			message.success('Đổi mật khẩu thành công!');
			localStorage.removeItem('teacherToken');
			localStorage.removeItem('teacherEmail');
			navigate('/teacher/login');
		} catch (err) {
			console.error('Error updating teacher:', err);
			message.error('Cập nhật thất bại. Vui lòng thử lại!');
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
		<div style={{ padding: '20px' }}>
			<Row>
				<Col span={2} style={{ paddingLeft: '270px' }}>
					<ButtonGoBack />
				</Col>
			</Row>
			<Row>
				<Col span={24} style={{ paddingLeft: '270px' }}>
					<Form
						name="changePassword"
						onFinish={onFinish}
						layout="vertical"
						style={{
							maxWidth: 500, // Increased maxWidth for larger form
							margin: '100px auto',
							padding: '30px', // Increased padding for a larger feel
							boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
							borderRadius: '8px',
						}}
					>
						<Form.Item
							label="Email"
							name="email"
							rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
						>
							<Input placeholder="Nhập email" />
						</Form.Item>

						<Form.Item
							label="Mật khẩu mới"
							name="newPassword"
							rules={[
								{ required: true, message: 'Vui lòng nhập mật khẩu mới!' },
								{ min: 6, message: 'Mật khẩu mới phải có ít nhất 6 ký tự!' },
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
									backgroundColor: '#ffae00',
									color: 'white',
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
