import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import React, { useState } from 'react';

import type { Center } from '@/schemas/center.schema';
import { createCenter } from '@/services/api/center';

interface CenterFormProps {
	onSuccess: () => void;
}

const CenterForm: React.FC<CenterFormProps> = ({ onSuccess }) => {
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();

	const onFinish = async (values: Partial<Center>) => {
		setLoading(true);
		try {
			const centerData: Center = {
				...values,
				_id: values._id || '', 
			} as Center;
			await createCenter(centerData);
			message.success('Tạo trung tâm thành công!');
			onSuccess();
		} catch (error) {
			message.error('Không thể tạo trung tâm.');
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ padding: '0 30px 0 150px', marginLeft: '110px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<h2>Tạo trung tâm mới</h2>
			</div>
			<Card className="center-form-card" style={{ backgroundColor: '#f5f5f5', padding: '24px' }}>
				<Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
					<Form.Item
						name="name"
						label={<span style={{ fontWeight: 'bold' }}>Tên trung tâm</span>}
						rules={[{ required: true, message: 'Vui lòng nhập tên trung tâm!' }]}
					>
						<Input placeholder="Nhập tên trung tâm" />
					</Form.Item>

					<Form.Item
						name="email"
						label={<span style={{ fontWeight: 'bold' }}>Email</span>}
						rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
					>
						<Input placeholder="Nhập email trung tâm" />
					</Form.Item>

					<Form.Item
						name="phone"
						label={<span style={{ fontWeight: 'bold' }}>Số điện thoại</span>}
						rules={[
							{ required: true, message: 'Vui lòng nhập số điện thoại!' },
							{ pattern: /^\d+$/, message: 'Số điện thoại chỉ được chứa chữ số!' },
							{ len: 10, message: 'Số điện thoại phải gồm đúng 10 chữ số!' },
						]}
					>
						<Input
							placeholder="Nhập số điện thoại"
							maxLength={10}
							onKeyPress={(event) => {
								if (!/\d/.test(event.key)) {
									event.preventDefault();
								}
							}}
						/>
					</Form.Item>

					<Form.Item
						name="address"
						label={<span style={{ fontWeight: 'bold' }}>Địa chỉ</span>}
						rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
					>
						<Input placeholder="Nhập địa chỉ trung tâm" />
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							loading={loading}
							icon={<PlusOutlined />}
						>
							Tạo trung tâm
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default CenterForm;
