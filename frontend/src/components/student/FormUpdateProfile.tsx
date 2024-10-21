import { SaveOutlined } from '@ant-design/icons';
import {
	Button,
	ConfigProvider,
	DatePicker,
	Form,
	Input,
	Select,
	Typography,
} from 'antd';
import locale from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { Student } from '@/schemas/student.schema';
import { fetchStudentData } from '@/services/custom/getStudentbyToken';
import {
	validateBirthDate,
	validateDateFormat,
	validateName,
	validatePhoneNumber,
	validateVietnameseAddress,
	validateVietnamesePhoneNumber,
} from '@/utils/inputValidate';

dayjs.locale('vi');

const { Title } = Typography;
const { Option } = Select;

const FormUpdate: React.FC = () => {
	const [student, setStudent] = useState<Student | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const isMobile = useMediaQuery({ maxWidth: 767 });

	useEffect(() => {
		const fetchStudent = async () => {
			try {
				const studentData = await fetchStudentData();
				setStudent(studentData);
			} catch (error) {
				console.error('Error fetching student:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchStudent();
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (student) {
			setStudent({ ...student, [e.target.name]: e.target.value });
		}
	};

	const handleGenderChange = (value: 'male' | 'female') => {
		if (student) {
			setStudent({ ...student, gender: value });
		}
	};

	const handleDateChange = (date: dayjs.Dayjs | null) => {
		if (student) {
			setStudent({ ...student, dob: date ? date.toDate() : null });
		}
	};

	const onFinish = (values: unknown) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo: unknown) => {
		console.log('Failed:', errorInfo);
	};

	if (loading) {
		return <div>Đang tải...</div>;
	}

	if (!student) {
		return <div>Không tìm thấy dữ liệu của học sinh.</div>;
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
										: Promise.reject('Tên không hợp lệ! Vui lòng nhập lại!');
								},
							},
						]}
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
										return Promise.reject('Số điện thoại không hợp lệ!');
									}
									if (!validateVietnamesePhoneNumber(value)) {
										return Promise.reject(
											'Số điện thoại không phải của Việt Nam!',
										);
									}
									return Promise.resolve();
								},
							},
						]}
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
												'Địa chỉ không hợp lệ! Vui lòng nhập lại!',
											);
								},
							},
						]}
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
									return validateDateFormat(value)
										? validateBirthDate(value)
											? Promise.resolve()
											: Promise.reject('Ngày sinh không hợp lệ!')
										: Promise.reject('Định dạng ngày không hợp lệ!');
								},
							},
						]}
					>
						<DatePicker
							value={student.dob ? dayjs(student.dob) : null}
							onChange={handleDateChange}
							placeholder="Vui lòng chọn ngày sinh của bạn"
							format="DD/MM/YYYY"
							style={{ width: '100%' }}
						/>
					</Form.Item>
					<Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
						<Button type="primary" icon={<SaveOutlined />} htmlType="submit">
							Lưu Lại
						</Button>
					</Form.Item>
				</Form>
			</div>
		</ConfigProvider>
	);
};

export default FormUpdate;
