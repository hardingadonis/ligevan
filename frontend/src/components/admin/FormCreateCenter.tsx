/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, message } from 'antd';
import React, { useState } from 'react';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import type { Center } from '@/schemas/center.schema';
import { createCenter } from '@/services/api/center';
import {
	validateEmailName,
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
			if (values.email && !values.email.endsWith('@ligevan.edu.vn')) {
				values.email = values.email + '@ligevan.edu.vn';
			}

			const centerData: Center = {
				...values,
			} as Center;
			await createCenter(centerData);
			message.success('Tạo trung tâm thành công!');
			onSuccess();
		} catch (error: any) {
			if (error.response && error.response.status === 409) {
				message.error('Trung tâm đã tồn tại.');
			} else {
				message.error('Không thể tạo trung tâm.');
			}
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

	const validateEmail = (_: unknown, value: string) => {
		if (validateEmailName(value)) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('Email không hợp lệ!'));
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
		<div style={{ paddingLeft: '270px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<div style={{ textAlign: 'left' }}>
					<ButtonGoBack link="/admin/centers" />
				</div>
				<h2>Tạo trung tâm mới</h2>
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						maxWidth: 1000,
						padding: '10px 90px',
						boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
						borderRadius: '8px',
						backgroundColor: '#f5f5f5',
						width: '100%',
					}}
				>
					<Row>
						<Col span={24}>
							<Form
								form={form}
								layout="vertical"
								labelCol={{ span: 24 }}
								wrapperCol={{ span: 24 }}
								style={{ marginTop: '40px' }}
								className="custom-form"
								onFinish={onFinish}
							>
								<Form.Item
									name="name"
									label={
										<span style={{ fontWeight: 'bold' }}>Tên trung tâm</span>
									}
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
											message: 'Vui lòng nhập email!',
										},
										{ validator: validateEmail },
									]}
								>
									<Input
										placeholder="Nhập tên (ví dụ: username)"
										addonAfter="@ligevan.edu.vn"
									/>
								</Form.Item>

								<Form.Item
									name="phone"
									label={
										<span style={{ fontWeight: 'bold' }}>Số điện thoại</span>
									}
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

								<Form.Item
									style={{ display: 'flex', justifyContent: 'flex-end' }}
								>
									<Button
										style={{ backgroundColor: '#0cd14e', color: 'white' }}
										htmlType="submit"
										loading={loading}
										icon={<PlusOutlined />}
									>
										Tạo trung tâm mới
									</Button>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	);
};

export default CenterForm;
