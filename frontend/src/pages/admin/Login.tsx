import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import '@/assets/styles/global.css';
import AdminLayout from '@/layouts/admin';
import { fetchLogin } from '@/services/api/auth';

interface LoginFormValues {
	username: string;
	password: string;
}

const AdminLogin: React.FC = () => {
	const navigate = useNavigate();

	const onFinish = async (values: LoginFormValues) => {
		try {
			const { accessToken } = await fetchLogin(values);
			localStorage.setItem('accessToken', accessToken);
			navigate('/admin/dashboard');
		} catch (error: unknown) {
			let title = 'Lỗi Đăng Nhập';
			let content = 'Đã xảy ra lỗi không xác định. Vui lòng thử lại.';

			if (typeof error === 'object' && error !== null && 'response' in error) {
				const err = error as {
					response: { status: number; data?: { message?: string } };
				};
				const { status, data } = err.response;
				switch (status) {
					case 404:
						title = 'Tài Khoản Không Tồn Tại';
						content = `Không tìm thấy tài khoản quản trị viên với tên đăng nhập "${values.username}".`;
						break;
					case 401:
						title = 'Mật Khẩu Không Đúng';
						content =
							data?.message ??
							'Mật khẩu bạn đã nhập không chính xác. Vui lòng kiểm tra và thử lại.';
						break;
					default:
						content = data?.message ? `Lỗi: ${data.message}` : content;
						break;
				}
			}

			Modal.error({
				title,
				content,
			});
		}
	};

	return (
		<AdminLayout showSidebar={false}>
			<div
				style={{
					padding: '60px 40px',
					maxWidth: '500px',
					margin: '50px auto',
					background: '#fff',
					boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
					borderRadius: '10px',
				}}
			>
				<Form
					onFinish={onFinish}
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					colon={true}
				>
					<Form.Item
						label="Tên đăng nhập"
						name="username"
						rules={[
							{ required: true, message: 'Vui lòng nhập tên đăng nhập!' },
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Mật khẩu"
						name="password"
						rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit" style={{ width: '100%' }}>
							Đăng nhập
						</Button>
					</Form.Item>
				</Form>
			</div>
		</AdminLayout>
	);
};

export default AdminLogin;
