import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import React, { useState } from 'react';

import type { Center } from '@/schemas/center.schema';
import { createCenter } from '@/services/api/center';
import {
	validateName,
	validatePhoneNumber,
	validateVietnameseAddress,
} from '@/utils/inputValidate';

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

	// Custom validation logic for form fields
	const validateFormName = (_: unknown, value: string) => {
		if (validateName(value)) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('Tên trung tâm không hợp lệ!'));
	};

	const validateFormPhone = (_: unknown, value: string) => {
		if (validatePhoneNumber(value)) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('Số điện thoại không hợp lệ!'));
	};

	const validateFormAddress = (_: unknown, value: string) => {
		if (validateVietnameseAddress(value)) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('Địa chỉ không hợp lệ!'));
	};

	return (
		<div style={{ padding: '0 30px 0 150px', marginLeft: '110px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<h2>Tạo trung tâm mới</h2>
			</div>
			<Card
				className="center-form-card"
				style={{ backgroundColor: '#f5f5f5', padding: '24px' }}
			>
				<Form
					form={form}
					layout="vertical"
					onFinish={onFinish}
					requiredMark={false}
				>
					<Form.Item
						name="name"
						label={<span style={{ fontWeight: 'bold' }}>Tên trung tâm</span>}
						rules={[{ required: true, validator: validateFormName }]}
					>
						<Input placeholder="Nhập tên trung tâm" />
					</Form.Item>

					<Form.Item
						name="email"
						label={<span style={{ fontWeight: 'bold' }}>Email</span>}
						rules={[
							{
								required: true,
								type: 'email',
								message: 'Vui lòng nhập email hợp lệ!',
							},
						]}
					>
						<Input placeholder="Nhập email trung tâm" />
					</Form.Item>

					<Form.Item
						name="phone"
						label={<span style={{ fontWeight: 'bold' }}>Số điện thoại</span>}
						rules={[{ required: true, validator: validateFormPhone }]}
					>
						<Input
							placeholder="(+84) Nhập số điện thoại"
							maxLength={11}
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
						rules={[{ required: true, validator: validateFormAddress }]}
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
