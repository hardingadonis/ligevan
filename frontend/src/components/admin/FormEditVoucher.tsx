import { SaveOutlined } from '@ant-design/icons';
import {
	Button,
	ConfigProvider,
	DatePicker,
	Form,
	Input,
	Spin,
	message,
} from 'antd';
import locale from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Voucher } from '@/schemas/voucher.schema';
import { getVoucherById, updateVoucher } from '@/services/api/voucher';

dayjs.locale('vi');

const FormEditVoucher: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [voucher, setVoucher] = useState<Voucher | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [form] = Form.useForm();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchVoucher = async () => {
			if (!id) return;
			try {
				const fetchedVoucher = await getVoucherById(id);
				setVoucher(fetchedVoucher);
				form.setFieldsValue({
					...fetchedVoucher,
					start: fetchedVoucher.start ? dayjs(fetchedVoucher.start) : null,
					end: fetchedVoucher.end ? dayjs(fetchedVoucher.end) : null,
				});
			} catch (error) {
				console.error('Lỗi khi lấy chi tiết mã giảm giá:', error);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchVoucher();
		}
	}, [id, form]);

	const handleUpdate = async (values: Voucher) => {
		if (!id) return;
		try {
			await updateVoucher(id, values);
			message.success('Mã giảm giá đã được cập nhật thành công!', 3);
			navigate(`/admin/vouchers/${id}`);
		} catch (error) {
			console.error('Lỗi khi cập nhật mã giảm giá:', error);
			message.error('Lỗi: Đã xảy ra lỗi khi cập nhật mã giảm giá!', 3);
		}
	};

	if (loading) {
		return (
			<div style={{ textAlign: 'center', padding: '20px' }}>
				<Spin size="large" />
			</div>
		);
	}

	if (!voucher) {
		return <div>Không tìm thấy mã giảm giá</div>;
	}

	return (
		<ConfigProvider locale={locale}>
			<div style={{ paddingLeft: '270px' }}>
				<div style={{ textAlign: 'center', marginBottom: 20 }}>
					<div style={{ textAlign: 'left' }}>
						<ButtonGoBack />
					</div>
					<h2>Chỉnh sửa mã giảm giá</h2>
				</div>

				<div
					style={{
						maxWidth: 1000,
						margin: '0 auto',
						padding: '10px 90px',
						boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
						borderRadius: '8px',
						backgroundColor: '#f5f5f5',
					}}
				>
					<Form
						form={form}
						layout="vertical"
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						style={{ marginTop: '40px' }}
						className="custom-form"
						onFinish={handleUpdate}
					>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(2, 1fr)',
								gap: '16px',
								marginBottom: '16px',
							}}
						>
							{' '}
							<Form.Item name="code" label="Mã giảm giá" labelAlign="left">
								<Input readOnly />
							</Form.Item>
							<Form.Item name="value" label="Giá trị" labelAlign="left">
								<Input suffix="%" />
							</Form.Item>
						</div>

						<Form.Item name="title" label="Tiêu đề" labelAlign="left">
							<Input />
						</Form.Item>
						<Form.Item name="description" label="Mô tả" labelAlign="left">
							<Input />
						</Form.Item>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(2, 1fr)',
								gap: '16px',
								marginBottom: '16px',
							}}
						>
							{' '}
							<Form.Item
								label="Thời gian bắt đầu"
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
									value={voucher.start ? dayjs(voucher.start) : null}
									name="start"
									format="DD/MM/YYYY"
									style={{ width: '100%' }}
									onChange={(date) => form.setFieldsValue({ start: date })}
								/>
							</Form.Item>
							<Form.Item
								label="Thời gian kết thúc"
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
													new Error('Vui lòng chọn thời gian bắt đầu trước!'),
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
									value={voucher.end ? dayjs(voucher.end) : null}
									name="end"
									format="DD/MM/YYYY"
									style={{ width: '100%' }}
									onChange={(date) => form.setFieldsValue({ end: date })}
								/>
							</Form.Item>{' '}
						</div>

						<Form.Item
							wrapperCol={{ span: 24 }}
							style={{
								textAlign: 'right',
							}}
						>
							<Button
								style={{
									backgroundColor: '#0cd14e',
									color: 'white',
								}}
								icon={<SaveOutlined />}
								htmlType="submit"
							>
								Lưu Lại
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</ConfigProvider>
	);
};

export default FormEditVoucher;
