/* eslint-disable react-hooks/exhaustive-deps */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Center } from '@/schemas/center.schema';
import { Voucher } from '@/schemas/voucher.schema';
import { apiBaseUrl } from '@/utils/apiBase';
import { formatDateToVietnamTimezone } from '@/utils/dateFormat';
import { formatPercentage } from '@/utils/formatPrice';

const { Option } = Select;

const AddVoucherForm: React.FC = () => {
	const { centerID } = useParams<{ centerID: string }>();
	const navigate = useNavigate();
	const [center, setCenter] = useState<Center | null>(null);
	const [vouchers, setVouchers] = useState<Voucher[]>([]);
	const [form] = Form.useForm();
	const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

	const fetchCenter = async () => {
		if (!centerID) return;
		try {
			const response = await axios.get<Center>(
				`${apiBaseUrl}/api/centers/${centerID}`,
			);
			setCenter(response.data);
		} catch (error) {
			console.error('Không thể tải thông tin trung tâm:', error);
		}
	};

	const fetchVouchers = async () => {
		try {
			const response = await axios.get<Voucher[]>(`${apiBaseUrl}/api/vouchers`);
			setVouchers(response.data);
		} catch (error) {
			console.error('Không thể tải thông tin voucher:', error);
		}
	};

	useEffect(() => {
		fetchCenter();
		fetchVouchers();
	}, [centerID]);

	const handleVoucherChange = (voucherId: string) => {
		const voucher = vouchers.find((v) => v._id === voucherId);
		setSelectedVoucher(voucher || null);
	};

	const handleSubmit = async () => {
		try {
			const existingClasses = Array.isArray(center?.classes)
				? center?.classes.map((classObj) => classObj._id)
				: [];

			const existingCourses = Array.isArray(center?.courses)
				? center?.courses.map((courseObj) => courseObj._id)
				: [];

			const existingVouchers = Array.isArray(center?.vouchers)
				? center?.vouchers.map((voucherObj) => voucherObj._id)
				: [];

			const existingTeachers = Array.isArray(center?.teachers)
				? center?.teachers.map((teacherObj) => teacherObj._id)
				: [];

			const updatedVouchers = [
				...existingVouchers,
				selectedVoucher?._id,
			].filter(Boolean);

			await axios.put(`${apiBaseUrl}/api/centers/${centerID}`, {
				...center,
				classes: existingClasses,
				courses: existingCourses,
				vouchers: updatedVouchers,
				teachers: existingTeachers,
			});
			message.success('Thêm mã giảm giá thành công!');
			navigate(`/admin/centers/${centerID}/vouchers`);
		} catch (error) {
			console.error('Không thể cập nhật trung tâm:', error);
		}
	};

	const currentDate = new Date();
	const filteredVouchers = vouchers.filter((voucher) => {
		const startDate = new Date(voucher.start);
		const endDate = new Date(voucher.end);
		return currentDate >= startDate && currentDate <= endDate;
	});

	return (
		<div style={{ paddingLeft: '270px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<div style={{ textAlign: 'left' }}>
					<ButtonGoBack />
				</div>
				<h2>Thêm voucher vào trung tâm</h2>
			</div>

			<div
				style={{
					maxWidth: 1000,
					margin: '0 auto',
					padding: 24,
					boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
					borderRadius: 8,
					backgroundColor: '#fff',
				}}
			>
				<Form
					form={form}
					layout="vertical"
					onFinish={handleSubmit}
					labelAlign="left"
				>
					<Form.Item label="Trung tâm">
						<Input value={center?.name} readOnly />
					</Form.Item>

					<Form.Item
						name="voucher"
						label="Voucher"
						rules={[{ required: true, message: 'Vui lòng chọn voucher' }]}
					>
						<Select placeholder="Chọn voucher" onChange={handleVoucherChange}>
							{filteredVouchers.map((voucher) => (
								<Option key={voucher._id} value={voucher._id}>
									{voucher.code}
								</Option>
							))}
						</Select>
					</Form.Item>

					{selectedVoucher && (
						<>
							<Form.Item label="Tên voucher">
								<Input value={selectedVoucher.title} readOnly />
							</Form.Item>
							<Form.Item label="Mô tả voucher">
								<Input value={selectedVoucher.description} readOnly />
							</Form.Item>
							<Form.Item label="Giá trị voucher">
								<Input
									value={formatPercentage(selectedVoucher.value)}
									readOnly
								/>
							</Form.Item>
							<Row gutter={16}>
								<Col span={12}>
									<Form.Item label="Ngày bắt đầu">
										<Input
											value={formatDateToVietnamTimezone(selectedVoucher.start)}
											readOnly
										/>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item label="Ngày kết thúc">
										<Input
											value={formatDateToVietnamTimezone(selectedVoucher.end)}
											readOnly
										/>
									</Form.Item>
								</Col>
							</Row>
						</>
					)}

					<Form.Item style={{ textAlign: 'right' }}>
						<Button
							type="primary"
							icon={<PlusOutlined />}
							htmlType="submit"
							style={{ backgroundColor: '#0cd14e', color: '#fff' }}
						>
							Thêm voucher
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default AddVoucherForm;
