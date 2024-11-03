import { SaveOutlined } from '@ant-design/icons';
import {
	Button,
	ConfigProvider,
	DatePicker,
	Form,
	Input,
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

import { Student } from '@/schemas/student.schema';
import { fetchStudentData } from '@/services/custom/getStudentbyToken';
import { setStudent, updateStudentData } from '@/slices/student';
import store from '@/store';
import { formatDateToUTC } from '@/utils/dateFormat';
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
	const { student, loading } = useSelector(
		(state: { students: { student: Student; loading: boolean } }) =>
			state.students,
	);
	const isMobile = useMediaQuery({ maxWidth: 767 });
	const navigate = useNavigate();

	useEffect(() => {
		const fetchStudent = async () => {
			try {
				const studentData = await fetchStudentData();
				dispatch(setStudent(studentData));
			} catch (error) {
				console.error('Error fetching student:', error);
			}
		};

		fetchStudent();
	}, [dispatch]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (student) {
			dispatch(setStudent({ ...student, [e.target.name]: e.target.value }));
		}
	};

	const handleGenderChange = (value: 'male' | 'female') => {
		if (student) {
			dispatch(setStudent({ ...student, gender: value }));
		}
	};

	const handleDateChange = (date: dayjs.Dayjs | null) => {
		const formattedDate = date ? formatDateToUTC(date.toDate()) : null;
		dispatch(setStudent({ ...student, dob: formattedDate }));
	};

	const onFinish = async (values: Partial<Student>) => {
		if (student) {
			try {
				await dispatch(updateStudentData({ id: student._id, values })).unwrap();
				message.success('Cập nhật thông tin thành công');
				navigate('/student/profile');
			} catch (error: unknown) {
				if (error instanceof Error) {
					console.error('Lỗi cập nhật thông tin:', error.message);
					message.error(
						`Cập nhật thông tin học sinh thất bại: ${error.message}`,
					);
				} else {
					console.error('Lỗi cập nhật thông tin:', error);
					message.error('Cập nhật thông tin học sinh thất bại.');
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

	if (!student) {
		return (
			<div style={{ textAlign: 'center', padding: '20px' }}>
				<Typography.Text type="danger" style={{ fontSize: '16px' }}>
					Không tìm thấy dữ liệu của học sinh.
				</Typography.Text>
			</div>
		);
	}

	return (
		<ConfigProvider locale={locale}>
			<div
				style={{
					maxWidth: 900,
					margin: '0 auto',
					padding: '10px 90px',
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
					borderRadius: '8px',
				}}
			>
				<Title level={2} style={{ textAlign: 'center' }}>
					Cập nhật thông tin
				</Title>
				<Form
					layout={isMobile ? 'vertical' : 'horizontal'}
					labelCol={isMobile ? {} : { span: 5 }}
					wrapperCol={isMobile ? {} : { span: 19 }}
					style={{ marginTop: '40px' }}
					className="custom-form"
					initialValues={{
						fullName: student.fullName,
						phone: student.phone,
						address: student.address,
						gender: student.gender,
						dob: student.dob ? dayjs(student.dob) : null,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
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
										: Promise.reject(
												new Error('Tên không hợp lệ! Vui lòng nhập lại!'),
											);
								},
							},
						]}
						style={{ marginBottom: '24px' }}
					>
						<Input
							name="fullName"
							value={student.fullName}
							onChange={handleInputChange}
						/>
					</Form.Item>
					<Form.Item
						label="Số điện thoại"
						labelAlign="left"
						name="phone"
						rules={[
							{
								required: true,
								message: 'Vui lòng nhập số điện thoại của bạn!',
							},
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
											new Error('Số điện thoại không phải của Việt Nam!'),
										);
									}
									return Promise.resolve();
								},
							},
						]}
						style={{ marginBottom: '24px' }}
					>
						<Input
							name="phone"
							value={student.phone}
							onChange={handleInputChange}
						/>
					</Form.Item>
					<Form.Item
						label="Địa chỉ"
						labelAlign="left"
						name="address"
						rules={[
							{ required: true, message: 'Vui lòng nhập địa chỉ của bạn!' },
							{
								validator: (_, value) => {
									if (!value) {
										return Promise.resolve();
									}
									return validateVietnameseAddress(value)
										? Promise.resolve()
										: Promise.reject(
												new Error('Địa chỉ không hợp lệ! Vui lòng nhập lại!'),
											);
								},
							},
						]}
						style={{ marginBottom: '24px' }}
					>
						<Input
							name="address"
							value={student.address}
							onChange={handleInputChange}
						/>
					</Form.Item>
					<Form.Item
						label="Giới tính"
						labelAlign="left"
						name="gender"
						rules={[
							{ required: true, message: 'Vui lòng chọn giới tính của bạn!' },
						]}
						style={{ marginBottom: '24px' }}
					>
						<Select value={student.gender} onChange={handleGenderChange}>
							<Option value="male">Nam</Option>
							<Option value="female">Nữ</Option>
						</Select>
					</Form.Item>
					<Form.Item
						label="Ngày sinh"
						labelAlign="left"
						name="dob"
						rules={[
							{ required: true, message: 'Vui lòng chọn ngày sinh của bạn!' },
							{
								validator: (_, value) => {
									if (!value) {
										return Promise.resolve();
									}
									const threeYearsAgo = dayjs().subtract(10, 'year');
									return value.isBefore(threeYearsAgo)
										? Promise.resolve()
										: Promise.reject(new Error('Học sinh phải trên 10 tuổi!'));
								},
							},
						]}
						style={{ marginBottom: '30px' }}
					>
						<DatePicker
							value={student.dob ? dayjs(student.dob) : null}
							onChange={handleDateChange}
							placeholder="Chọn ngày sinh"
							format="DD/MM/YYYY"
							style={{ width: '100%' }}
						/>
					</Form.Item>
					<Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
						<Button
							icon={<SaveOutlined />}
							htmlType="submit"
							style={{ backgroundColor: '#0cd14e', color: 'white' }}
						>
							Lưu Lại
						</Button>
					</Form.Item>
				</Form>
			</div>
		</ConfigProvider>
	);
};

export default FormUpdate;
