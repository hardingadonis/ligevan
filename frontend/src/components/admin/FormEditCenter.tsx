import { Button, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Center } from '@/schemas/center.schema';
import { getCenterById, updateCenter } from '@/services/api/center';

const FormEditCenter: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchCenter = async () => {
			try {
				if (id) {
					const center = await getCenterById(id);
					form.setFieldsValue(center);
				} else {
					message.error('ID trung tâm không hợp lệ');
				}
			} catch {
				message.error('Không thể lấy dữ liệu trung tâm');
			}
		};
		fetchCenter();
	}, [id, form]);

	const onFinish = async (values: Partial<Center>) => {
		setLoading(true);
		try {
			if (id) {
				await updateCenter(id, values);
			} else {
				message.error('ID trung tâm không hợp lệ');
			}
			message.success('Cập nhật trung tâm thành công');
			navigate('/admin/centers');
		} catch {
			message.error('Cập nhật trung tâm thất bại');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '65px 20px 0 270px',
			}}
		>
			<h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
				Chỉnh sửa thông tin trung tâm
			</h2>
			<div
				style={{
					maxWidth: '800px',
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
					padding: '20px',
					borderRadius: '8px',
					backgroundColor: '#f5f5f5',
					width: '100%',
				}}
			>
				<Form
					form={form}
					onFinish={onFinish}
					layout="horizontal"
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 20 }}
					labelAlign="left"
				>
					<Form.Item
						name="name"
						label="Tên"
						rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="email"
						label="Email"
						rules={[{ required: true, message: 'Vui lòng nhập email' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="address"
						label="Địa chỉ"
						rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="phone"
						label="Số điện thoại"
						rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Button type="primary" htmlType="submit" loading={loading}>
							Cập nhật
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default FormEditCenter;
