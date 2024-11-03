/* eslint-disable react-hooks/exhaustive-deps */
import { PlusOutlined } from '@ant-design/icons';
import {
	Avatar,
	Button,
	Col,
	ConfigProvider,
	DatePicker,
	Form,
	Input,
	Modal,
	Row,
	Select,
	message,
} from 'antd';
import locale from 'antd/locale/vi_VN';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Center } from '@/schemas/center.schema';
import { Teacher } from '@/schemas/teacher.schema';
import { apiBaseUrl } from '@/utils/apiBase';
import {
	validateEmailName,
	validatePhoneNumber,
	validateVietnamesePhoneNumber,
} from '@/utils/inputValidate';

dayjs.locale('vi');
const { Option } = Select;

const TeacherForm: React.FC = () => {
	const { centerID } = useParams<{ centerID: string }>();
	const navigate = useNavigate();
	const [center, setCenter] = useState<Center | null>(null);
	const [teachers, setTeachers] = useState<Teacher[]>([]);
	const [form] = Form.useForm();
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

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

	const fetchAllTeachers = async () => {
		try {
			const response = await axios.get(`${apiBaseUrl}/api/teachers`);
			setTeachers(response.data);
		} catch (error) {
			console.error('Không thể tải thông tin giáo viên:', error);
		}
	};

	useEffect(() => {
		fetchCenter();
		fetchAllTeachers();
	}, [centerID]);

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAvatarUrl(e.target.value || import.meta.env.VITE_AVATAR_URL);
	};

	const handleSubmit = async (values: {
		fullName: string;
		email: string;
		password: string;
		phone: string;
		address: string;
		gender: string;
		dob: dayjs.Dayjs;
		avatar: string;
		classes: string[];
	}) => {
		const email = `${values.email}@ligevan.edu.vn`;

		const isDuplicateEmail = teachers.some(
			(existingTeacher) => existingTeacher.email === email,
		);
		if (isDuplicateEmail) {
			Modal.confirm({
				title: 'Cảnh báo',
				content: 'Email này đã tồn tại.',
				centered: true,
				onOk: () => {},
				onCancel: () => {},
			});
			return;
		}

		const isRealPhone = validateVietnamesePhoneNumber(values.phone);
		if (!isRealPhone) {
			Modal.confirm({
				title: 'Cảnh báo',
				content: 'Hãy nhập số điện thoại đúng.',
				centered: true,
				onOk: () => {},
				onCancel: () => {},
			});
			return;
		}

		setAvatarUrl(values.avatar || import.meta.env.VITE_AVATAR_URL);

		try {
			const payload = {
				center: centerID,
				...values,
				email,
				dob: values.dob.format('YYYY-MM-DD'),
				classes: [],
			};

			const response = await axios.post(`${apiBaseUrl}/api/teachers`, payload);
			const newTeacherId = response.data._id;

			const existingTeachers = Array.isArray(center?.teachers)
				? center?.teachers.map((teacherObj) => teacherObj._id)
				: [];

			const updatedTeachers = [...existingTeachers, newTeacherId];

			await axios.put(`${apiBaseUrl}/api/centers/${centerID}`, {
				...center,
				teachers: updatedTeachers,
			});
			message.success('Tạo giáo viên thành công!');
			navigate(`/admin/centers/${centerID}/teachers`);
		} catch (error) {
			console.error('Unexpected error:', error);
		}
	};

	const validateFormPhone = (_: unknown, value: string) => {
		if (validatePhoneNumber(value)) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('Số điện thoại không hợp lệ!'));
	};

	const validateEmail = (_: unknown, value: string) => {
		if (validateEmailName(value)) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('Email không hợp lệ!'));
	};

	return (
		<ConfigProvider locale={locale}>
			<div style={{ paddingLeft: '270px' }}>
				<div style={{ textAlign: 'center', marginBottom: 20 }}>
					<div style={{ textAlign: 'left' }}>
						<ButtonGoBack />
					</div>
					<h2>Tạo giáo viên mới</h2>
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
					<Row gutter={16}>
						<Col span={7} style={{ textAlign: 'center' }}>
							<Avatar
								src={avatarUrl || import.meta.env.VITE_AVATAR_URL}
								size={150}
							/>
						</Col>
						<Col span={17}>
							<Form
								form={form}
								layout="vertical"
								onFinish={handleSubmit}
								labelAlign="left"
							>
								<Form.Item label="Trung tâm">
									<Input value={center?.name} disabled />
								</Form.Item>

								<Row gutter={16}>
									<Col span={12}>
										<Form.Item
											name="fullName"
											label="Họ và tên"
											rules={[
												{ required: true, message: 'Vui lòng nhập họ và tên' },
											]}
										>
											<Input placeholder="Nhập họ và tên" />
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item
											name="email"
											label="Email"
											rules={[
												{ required: true, message: 'Vui lòng nhập email' },
												{ validator: validateEmail },
											]}
										>
											<Input
												placeholder="Nhập tên (ví dụ: username)"
												addonAfter="@ligevan.edu.vn"
											/>
										</Form.Item>
									</Col>
								</Row>

								<Row gutter={16}>
									<Col span={12}>
										<Form.Item
											name="password"
											label="Mật khẩu"
											rules={[
												{ required: true, message: 'Vui lòng nhập mật khẩu' },
												{ min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
											]}
										>
											<Input.Password placeholder="Nhập mật khẩu" />
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item
											name="phone"
											label="Số điện thoại"
											rules={[
												{
													required: true,
													message: 'Vui lòng nhập số điện thoại',
													validator: validateFormPhone,
												},
											]}
										>
											<Input maxLength={11} placeholder="Nhập số điện thoại" />
										</Form.Item>
									</Col>
								</Row>

								<Row gutter={16}>
									<Col span={12}>
										<Form.Item
											name="address"
											label="Địa chỉ"
											rules={[
												{ required: true, message: 'Vui lòng nhập địa chỉ' },
											]}
										>
											<Input placeholder="Nhập địa chỉ" />
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item
											name="gender"
											label="Giới tính"
											rules={[
												{ required: true, message: 'Vui lòng chọn giới tính' },
											]}
										>
											<Select placeholder="Chọn giới tính">
												<Option value="male">Nam</Option>
												<Option value="female">Nữ</Option>
											</Select>
										</Form.Item>
									</Col>
								</Row>
								<Row gutter={16}>
									<Col span={12}>
										<Form.Item
											name="dob"
											label="Ngày sinh"
											rules={[
												{ required: true, message: 'Vui lòng chọn ngày sinh' },
												{
													validator(_, value) {
														if (!value || dayjs().diff(value, 'years') >= 20) {
															return Promise.resolve();
														}
														return Promise.reject(
															new Error('Giáo viên phải ít nhất 20 tuổi!'),
														);
													},
												},
											]}
										>
											<DatePicker
												format="DD/MM/YYYY"
												style={{ width: '100%' }}
											/>
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item
											name="avatar"
											label="Ảnh đại diện"
											rules={[
												{
													required: true,
													message: 'Vui lòng nhập đường dẫn của ảnh!',
												},
											]}
										>
											<Input
												placeholder="URL của ảnh đại diện"
												onChange={handleAvatarChange}
											/>
										</Form.Item>
									</Col>
								</Row>

								<Form.Item style={{ textAlign: 'right' }}>
									<Button
										type="primary"
										icon={<PlusOutlined />}
										htmlType="submit"
										style={{ backgroundColor: '#0cd14e', color: '#fff' }}
									>
										Tạo giáo viên mới
									</Button>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</div>
			</div>
		</ConfigProvider>
	);
};

export default TeacherForm;
