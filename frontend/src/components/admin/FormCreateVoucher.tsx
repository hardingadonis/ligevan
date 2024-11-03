import { PlusOutlined } from '@ant-design/icons';
import {
	Button,
	Col,
	ConfigProvider,
	DatePicker,
	Form,
	Input,
	Row,
	message,
} from 'antd';
import locale from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Voucher } from '@/schemas/voucher.schema';
import { checkVoucherCodeExists, createVoucher } from '@/services/api/voucher';
import { validateCode, validateDiscount } from '@/utils/inputValidate';

dayjs.locale('vi');

const VoucherForm: React.FC = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [discount, setDiscount] = useState<string>('');

	const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setDiscount(value);
		console.log(parseFloat(value));
	};

	const handleSubmit = async (voucher: Voucher) => {
		try {
			const formattedVoucher = {
				...voucher,
				code: voucher.code.toUpperCase(),
				value: parseFloat(discount),
			};
			console.log(formattedVoucher);
			await createVoucher(formattedVoucher);
			message.success('Mã giảm giá được tạo thành công!');
			form.resetFields();
			navigate('/admin/vouchers');
		} catch (error) {
			message.error('Lỗi khi tạo mã giảm giá! Vui lòng thử lại sau.');
			console.log(error);
		}
	};

	return (
		<ConfigProvider locale={locale}>
			<div
				style={{
					paddingLeft: '270px',
				}}
			>
				<div style={{ textAlign: 'center', marginBottom: 20 }}>
					<div style={{ textAlign: 'left' }}>
						<ButtonGoBack link="/admin/vouchers" />
					</div>
					<h2>Tạo mã giảm giá mới</h2>
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
									onFinish={handleSubmit}
								>
									<div
										style={{
											display: 'grid',
											gridTemplateColumns: 'repeat(2, 1fr)',
											gap: '16px',
											marginBottom: '16px',
										}}
									>
										<Form.Item
											label={
												<span style={{ fontWeight: 'bold' }}>Mã giảm giá</span>
											}
											labelAlign="left"
											name="code"
											rules={[
												{
													required: true,
													message: 'Vui lòng nhập mã giảm giá!',
												},
												{
													validator: async (_, value) => {
														if (!value) {
															return Promise.resolve();
														}
														if (!validateCode(value)) {
															return Promise.reject(
																new Error(
																	'Mã giảm giá không hợp lệ! Vui lòng nhập lại!',
																),
															);
														}
														const exists = await checkVoucherCodeExists(value);
														if (exists) {
															return Promise.reject(
																new Error(
																	'Mã giảm giá đã tồn tại! Vui lòng nhập mã khác!',
																),
															);
														}
														return Promise.resolve();
													},
												},
											]}
										>
											<Input placeholder="Nhập mã giảm giá" />
										</Form.Item>
										<Form.Item
											label={
												<span style={{ fontWeight: 'bold' }}>Giá trị</span>
											}
											labelAlign="left"
											name="value"
											rules={[
												{
													required: true,
													message: 'Vui lòng nhập giá trị của mã giảm giá!',
												},
												{
													validator: (_, value) => {
														if (!value) {
															return Promise.resolve();
														}
														return validateDiscount(value)
															? Promise.resolve()
															: Promise.reject(
																	new Error(
																		'Giá trị không hợp lệ! Vui lòng nhập lại!',
																	),
																);
													},
												},
											]}
										>
											<Input
												placeholder="Nhập giá trị"
												suffix="%"
												type="number"
												step="0.01"
												onChange={handleDiscountChange}
											/>
										</Form.Item>
									</div>
									<Form.Item
										label={<span style={{ fontWeight: 'bold' }}>Tiêu đề</span>}
										labelAlign="left"
										name="title"
										rules={[
											{ required: true, message: 'Vui lòng nhập tiêu đề!' },
										]}
									>
										<Input placeholder="Nhập tiêu đề" />
									</Form.Item>
									<Form.Item
										label={<span style={{ fontWeight: 'bold' }}>Mô tả</span>}
										labelAlign="left"
										name="description"
									>
										<Input.TextArea rows={4} placeholder="Nhập mô tả" />
									</Form.Item>
									<div
										style={{
											display: 'grid',
											gridTemplateColumns: 'repeat(2, 1fr)',
											gap: '16px',
											marginBottom: '16px',
										}}
									>
										<Form.Item
											label={
												<span style={{ fontWeight: 'bold' }}>
													Thời gian bắt đầu
												</span>
											}
											labelAlign="left"
											name="start"
											rules={[
												{
													required: true,
													message: 'Vui lòng chọn thời gian bắt đầu!',
												},
												{
													validator: (_, value) => {
														if (!value) {
															return Promise.resolve();
														}
														const now = dayjs();
														return value.isAfter(now)
															? Promise.resolve()
															: Promise.reject(
																	new Error(
																		'Thời gian bắt đầu phải ở sau thời điểm hiện tại!',
																	),
																);
													},
												},
											]}
											style={{ marginBottom: '30px' }}
										>
											<DatePicker
												name="start"
												placeholder="Chọn thời gian bắt đầu"
												format="DD/MM/YYYY"
												style={{ width: '100%' }}
											/>
										</Form.Item>
										<Form.Item
											label={
												<span style={{ fontWeight: 'bold' }}>
													Thời gian kết thúc
												</span>
											}
											labelAlign="left"
											name="end"
											rules={[
												{
													required: true,
													message: 'Vui lòng chọn thời gian kết thúc!',
												},
												{
													validator: (_, value) => {
														if (!value) {
															return Promise.resolve();
														}
														const start = form.getFieldValue('start');
														if (!start) {
															return Promise.reject(
																new Error(
																	'Vui lòng chọn thời gian bắt đầu trước!',
																),
															);
														}
														return value.isAfter(start)
															? Promise.resolve()
															: Promise.reject(
																	new Error(
																		'Thời gian kết thúc phải ở sau thời gian bắt đầu!',
																	),
																);
													},
												},
											]}
											style={{ marginBottom: '30px' }}
										>
											<DatePicker
												name="end"
												placeholder="Chọn thời gian kết thúc"
												format="DD/MM/YYYY"
												style={{ width: '100%' }}
											/>
										</Form.Item>
									</div>

									<Form.Item
										style={{ display: 'flex', justifyContent: 'flex-end' }}
									>
										<Button
											type="primary"
											style={{ backgroundColor: '#0cd14e' }}
											htmlType="submit"
										>
											<PlusOutlined />
											Tạo mã giảm giá mới
										</Button>
									</Form.Item>
								</Form>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</ConfigProvider>
	);
};

export default VoucherForm;
