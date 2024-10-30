/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from '@ant-design/icons';
import {
	Button,
	Col,
	ConfigProvider,
	Form,
	Row,
	Select,
	Table,
	TableColumnsType,
	message,
} from 'antd';
import locale from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import React, { useEffect, useState } from 'react';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Course } from '@/schemas/course.schema';
import { Teacher } from '@/schemas/teacher.schema';
import { getAllTeacherByCourseId } from '@/services/api/class';
import { getAllCourse } from '@/services/api/course';
import { calculateSalary } from '@/services/api/salary';
import { getTeacherById } from '@/services/api/teacher';
import { formatPrice } from '@/utils/formatPrice';

interface DataType extends Teacher {
	key: string;
	fullName: string;
	email: string;
	phone: string;
	totalSalary: number | null;
	actions: JSX.Element;
}

dayjs.locale('vi');

const FormCalculateSalaries: React.FC = () => {
	const [form] = Form.useForm();
	const [courses, setCourses] = useState<Course[]>([]);
	const [teachers, setTeachers] = useState<DataType[]>([]);
	const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
	const [selectedYear, setSelectedYear] = useState<number | null>(null);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const courses = await getAllCourse();
				setCourses(courses);
			} catch (error) {
				console.error('Error fetching courses:', error);
			}
		};
		fetchCourses();
	}, []);

	const handleCourseChange = async (courseId: string) => {
		try {
			const teacherIds = await getAllTeacherByCourseId(courseId);
			const teacherDetails = await Promise.all(
				teacherIds.map(async (teacherId: string) => {
					return await getTeacherById(teacherId);
				}),
			);
			const transformedTeachers = teacherDetails.map((teacher) => ({
				...teacher,
				key: teacher._id,
				fullName: teacher.fullName,
				email: teacher.email,
				phone: teacher.phone,
				totalSalary: null,
				actions: <span>Actions</span>,
			}));
			setTeachers(transformedTeachers);
		} catch (error: any) {
			if (error.response && error.response.status === 404) {
				setTeachers([]);
			} else {
				console.error('Error fetching teachers:', error);
			}
		}
	};

	const handleMonthChange = (value: number) => {
		setSelectedMonth(value);
	};

	const handleYearChange = (value: number) => {
		setSelectedYear(value);
		setSelectedMonth(null); // Reset selected month when year changes
	};

	const handleCalculateSalaries = async () => {
		if (selectedMonth && selectedYear && teachers.length > 0) {
			const start = dayjs()
				.year(selectedYear)
				.month(selectedMonth - 1)
				.startOf('month')
				.toISOString();
			const end = dayjs()
				.year(selectedYear)
				.month(selectedMonth - 1)
				.endOf('month')
				.toISOString();
			const teacherIds = teachers.map((teacher) => teacher._id);

			try {
				const response = await calculateSalary({
					percent: parseInt(import.meta.env.VITE_SALARY_PERCENT) || 1,
					teachers: teacherIds,
					start,
					end,
				});

				console.log(response);

				const updatedTeachers = teachers.map((teacher) => {
					const salaryData = response.find(
						(item) => item.teacher.toString() === teacher._id,
					);
					return {
						...teacher,
						totalSalary: salaryData ? salaryData.finalSalary : 0,
					};
				});

				setTeachers(updatedTeachers);
				message.success('Tính lương thành công!');
			} catch (error: any) {
				if (error.response && error.response.status === 409) {
					message.error('Các giáo viên này đã được tính lương!');
				} else {
					console.error('Error calculating salaries:', error);
				}
			}
		}
	};

	const columns: TableColumnsType<DataType> = [
		{
			title: 'STT',
			dataIndex: 'key',
			width: '5%',
			align: 'center',
			render: (_: unknown, __: unknown, index: number) => index + 1,
		},
		{
			title: <div style={{ textAlign: 'center' }}>Tên giáo viên</div>,
			dataIndex: 'fullName',
			width: '30%',
		},
		{
			title: <div style={{ textAlign: 'center' }}>Email</div>,
			dataIndex: 'email',
			width: '30%',
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'phone',
			align: 'center',
			width: '15%',
		},
		{
			title: 'Tổng lương',
			dataIndex: 'totalSalary',
			align: 'center',
			width: '20%',
			render: (text: any) => (
				<span>{text === null ? 'Chưa tính' : formatPrice(text)}</span>
			),
		},
	];

	const months = Array.from({ length: 12 }, (_, i) => ({
		value: i + 1,
		label: `Tháng ${i + 1}`,
	}));

	const currentYear = dayjs().year();
	const years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) => ({
		value: 2020 + i,
		label: `${2020 + i}`,
	}));

	return (
		<ConfigProvider locale={locale}>
			<div style={{ paddingLeft: '270px' }}>
				<div style={{ textAlign: 'center', marginBottom: 20 }}>
					<div style={{ textAlign: 'left' }}>
						<ButtonGoBack />
					</div>
					<h2>Tính lương cho các giáo viên</h2>
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
						<Row gutter={16}>
							<Col span={24}>
								<Form
									form={form}
									layout="vertical"
									labelCol={{ span: 24 }}
									wrapperCol={{ span: 24 }}
									style={{ marginTop: '40px' }}
									className="custom-form"
								>
									<Row gutter={16}>
										<Col span={12}>
											<Form.Item
												name="{course}"
												label="Khóa học"
												style={{ fontWeight: 'bold' }}
												rules={[
													{
														required: true,
														message: 'Vui lòng chọn khóa học',
													},
												]}
											>
												<Select
													style={{ width: '100%' }}
													placeholder="Chọn khóa học"
													options={courses.map((course) => ({
														value: course._id,
														label: course.title,
													}))}
													onChange={handleCourseChange}
												/>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												name="{time}"
												label="Chọn thời gian"
												style={{ fontWeight: 'bold' }}
												rules={[
													{
														required: true,
														message: 'Vui lòng chọn thời gian',
													},
												]}
											>
												<Row gutter={16}>
													<Col span={12}>
														<Select
															style={{ width: '100%' }}
															placeholder="Chọn năm"
															options={years}
															onChange={handleYearChange}
														/>
													</Col>
													<Col span={12}>
														<Select
															style={{ width: '100%' }}
															placeholder="Chọn tháng"
															options={months}
															onChange={handleMonthChange}
															disabled={!selectedYear}
														/>
													</Col>
												</Row>
											</Form.Item>
										</Col>
									</Row>
								</Form>
							</Col>
						</Row>

						<Row style={{ marginTop: 20 }}>
							<Col span={24}>
								<Table<DataType>
									dataSource={teachers}
									columns={columns}
									rowKey="_id"
									locale={{
										emptyText: 'Không có giáo viên nào dạy khóa học này',
									}}
								/>
							</Col>
						</Row>
						<Form.Item
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
								marginTop: 20,
							}}
						>
							<Button
								style={{ backgroundColor: '#0cd14e', color: 'white' }}
								icon={<PlusOutlined />}
								onClick={handleCalculateSalaries}
							>
								Tính lương
							</Button>
						</Form.Item>
					</div>
				</div>
			</div>
		</ConfigProvider>
	);
};

export default FormCalculateSalaries;
