import { SaveOutlined } from '@ant-design/icons';
import {
	Avatar,
	Button,
	Col,
	ConfigProvider,
	DatePicker,
	Form,
	Input,
	Row,
	Select,
	Spin,
	Typography,
	message,
} from 'antd';
import locale from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Teacher } from '@/schemas/teacher.schema';
import { fetchTeacherData } from '@/services/custom/getTeacherbyToken';
import { setTeacher, updateTeacherData } from '@/slices/teacher';
import store from '@/store';
import {
	validateName,
	validatePhoneNumber,
	validateVietnameseAddress,
	validateVietnamesePhoneNumber,
} from '@/utils/inputValidate';

dayjs.locale('vi');

const { Title } = Typography;
const { Option } = Select;

const FormUpdate: React.FC = () => {
	const dispatch = useDispatch<typeof store.dispatch>();
	const { teacher, loading } = useSelector(
		(state: { teachers: { teacher: Teacher; loading: boolean } }) =>
			state.teachers,
	);
	const isMobile = useMediaQuery({ maxWidth: 767 });
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTeacher = async () => {
			try {
				const teacherData = await fetchTeacherData();
				dispatch(setTeacher(teacherData));
			} catch (error) {
				console.error('Error fetching teacher:', error);
			}
		};

		fetchTeacher();
	}, [dispatch]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (teacher) {
			dispatch(setTeacher({ ...teacher, [e.target.name]: e.target.value }));
		}
	};

	const handleGenderChange = (value: 'male' | 'female') => {
		if (teacher) {
			dispatch(setTeacher({ ...teacher, gender: value }));
		}
	};

	const handleDateChange = (date: dayjs.Dayjs | null) => {
		const utcDate = date ? new Date(date.toISOString()) : new Date();
		if (teacher) {
			dispatch(setTeacher({ ...teacher, dob: utcDate }));
		}
	};

	const onFinish = async (values: Partial<Teacher>) => {
		if (teacher) {
			try {
				await dispatch(updateTeacherData({ id: teacher._id, values })).unwrap();
				message.success('Cập nhật thông tin thành công');
				navigate('/teacher/profile');
			} catch (error: unknown) {
				if (error instanceof Error) {
					message.error(`Cập nhật thất bại: ${error.message}`);
				} else {
					message.error('Cập nhật thất bại.');
				}
			}
		}
	};

	const onFinishFailed = (errorInfo: unknown) => {
		console.log('Failed:', errorInfo);
	};

	if (loading) {
		return (
			<div style={{ display: 'inline-flex', alignItems: 'center' }}>
				<Spin />
				<span style={{ marginLeft: 8, color: 'white' }}>Đang tải...</span>
			</div>
		);
	}

	if (!teacher) {
		return (
			<div style={{ textAlign: 'center', padding: '20px' }}>
				<Typography.Text type="danger" style={{ fontSize: '16px' }}>
					Không tìm thấy dữ liệu của giáo viên.
				</Typography.Text>
			</div>
		);
	}

	const avatarUrl = teacher.avatar || import.meta.env.VITE_AVATAR_URL;

	return (
		<ConfigProvider locale={locale}>
			<div style={{ paddingLeft: '270px' }}>
				<Row>
					<Col span={2}>
						<ButtonGoBack />
					</Col>
					<Col span={20}>
						<Title level={2} style={{ textAlign: 'center' }}>
							Cập nhật thông tin giáo viên
						</Title>
					</Col>
				</Row>
				<div
					style={{
						maxWidth: 900,
						margin: '0 auto',
						padding: '10px 90px',
						boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
						borderRadius: '8px',
						backgroundColor: '#f5f5f5',
					}}
				>
					<Form
						layout={isMobile ? 'vertical' : 'horizontal'}
						labelCol={isMobile ? {} : { span: 5 }}
						wrapperCol={isMobile ? {} : { span: 19 }}
						style={{ marginTop: '40px' }}
						initialValues={{
							fullName: teacher.fullName,
							phone: teacher.phone,
							address: teacher.address,
							gender: teacher.gender,
							dob: teacher.dob ? dayjs(teacher.dob) : null,
							avatar: teacher.avatar,
						}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
					>
						<Row>
							<Col span={7}>
								<Form.Item labelAlign="left">
									<Avatar
										src={avatarUrl}
										alt="Avatar Preview"
										size={150}
										style={{
											objectFit: 'cover',
										}}
									/>
								</Form.Item>
							</Col>

							<Col span={17}>
								<Form.Item
									label="Tên"
									labelAlign="left"
									name="fullName"
									rules={[
										{ required: true, message: 'Vui lòng nhập tên của bạn!' },
										{
											validator: (_, value) => {
												if (!value) {
													return Promise.resolve();
												}
												return validateName(value)
													? Promise.resolve()
													: Promise.reject(new Error('Tên không hợp lệ!'));
											},
										},
									]}
								>
									<Input name="fullName" onChange={handleInputChange} />
								</Form.Item>

								<Form.Item
									label="Số điện thoại"
									labelAlign="left"
									name="phone"
									rules={[
										{ required: true, message: 'Vui lòng nhập số điện thoại!' },
										{
											validator: (_, value) => {
												if (!value) {
													return Promise.resolve();
												}
												if (!validatePhoneNumber(value)) {
													return Promise.reject(
														new Error('Số điện thoại không hợp lệ!'),
													);
												}
												if (!validateVietnamesePhoneNumber(value)) {
													return Promise.reject(
														new Error('Không phải số điện thoại Việt Nam!'),
													);
												}
												return Promise.resolve();
											},
										},
									]}
								>
									<Input name="phone" onChange={handleInputChange} />
								</Form.Item>

								<Form.Item
									label="Địa chỉ"
									labelAlign="left"
									name="address"
									rules={[
										{ required: true, message: 'Vui lòng nhập địa chỉ!' },
										{
											validator: (_, value) => {
												if (!value) {
													return Promise.resolve();
												}
												return validateVietnameseAddress(value)
													? Promise.resolve()
													: Promise.reject(new Error('Địa chỉ không hợp lệ!'));
											},
										},
									]}
								>
									<Input name="address" onChange={handleInputChange} />
								</Form.Item>

								<Form.Item
									label="Giới tính"
									labelAlign="left"
									name="gender"
									rules={[
										{ required: true, message: 'Vui lòng chọn giới tính!' },
									]}
								>
									<Select value={teacher.gender} onChange={handleGenderChange}>
										<Option value="male">Nam</Option>
										<Option value="female">Nữ</Option>
									</Select>
								</Form.Item>

								<Form.Item
									label="Ngày sinh"
									labelAlign="left"
									name="dob"
									rules={[
										{ required: true, message: 'Vui lòng chọn ngày sinh!' },
										{
											validator: (_, value) => {
												if (!value) {
													return Promise.resolve();
												}
												const twentyYearsAgo = dayjs().subtract(20, 'year');
												return value.isBefore(twentyYearsAgo)
													? Promise.resolve()
													: Promise.reject(
															new Error('Tuổi của giáo viên phải trên 20!'),
														);
											},
										},
									]}
								>
									<DatePicker
										onChange={handleDateChange}
										format="DD/MM/YYYY"
										style={{ width: '100%' }}
									/>
								</Form.Item>

								<Form.Item
									label="Link ảnh hồ sơ"
									labelAlign="left"
									name="avatar"
									rules={[
										{ required: true, message: 'Vui lòng nhập URL avatar!' },
									]}
								>
									<Input name="avatar" onChange={handleInputChange} />
								</Form.Item>

								<Form.Item
									wrapperCol={{ span: 24 }}
									style={{ textAlign: 'right' }}
								>
									<Button
										type="primary"
										icon={<SaveOutlined />}
										htmlType="submit"
										style={{ backgroundColor: '#0cd14e', color: 'white' }}
									>
										Lưu Lại
									</Button>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</div>
			</div>
		</ConfigProvider>
	);
};

export default FormUpdate;
