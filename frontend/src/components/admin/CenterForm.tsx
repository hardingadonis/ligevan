import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';

import type { Center } from '@/schemas/center.schema';
import type { Class } from '@/schemas/class.schema';
import type { Teacher } from '@/schemas/teacher.schema';
import { createCenter } from '@/services/api/center';
import { getAllClasses } from '@/services/api/class';
import { getAllCourse } from '@/services/api/course';
import { getAllTeacher } from '@/services/api/teacher';
import { getAllVoucher } from '@/services/api/voucher';

interface Course {
	_id: string;
	title: string;
}

interface Voucher {
	_id: string;
	title: string;
}

interface CenterFormProps {
	onSuccess: () => void;
}

const CenterForm: React.FC<CenterFormProps> = ({ onSuccess }) => {
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();
	const [courses, setCourses] = useState<Course[]>([]);
	const [teachers, setTeachers] = useState<Teacher[]>([]);
	const [vouchers, setVouchers] = useState<Voucher[]>([]);
	const [classes, setClasses] = useState<Class[]>([]);
	const [loadingCourses, setLoadingCourses] = useState<boolean>(false);
	const [loadingVouchers, setLoadingVouchers] = useState<boolean>(false);
	const [loadingTeachers, setLoadingTeachers] = useState<boolean>(false);
	const [loadingClasses, setLoadingClasses] = useState<boolean>(false);

	const onFinish = async (values: Center) => {
		setLoading(true);
		try {
			await createCenter(values);
			message.success('Tạo trung tâm thành công!');
			onSuccess();
		} catch (error) {
			message.error('Không thể tạo trung tâm.');
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const fetchCourses = async () => {
			setLoadingCourses(true);
			try {
				const courseData = await getAllCourse();
				setCourses(courseData);
			} catch (error) {
				console.error('Error fetching courses:', error);
			} finally {
				setLoadingCourses(false);
			}
		};

		const fetchVouchers = async () => {
			setLoadingVouchers(true);
			try {
				const voucherData = await getAllVoucher();
				setVouchers(voucherData);
			} catch (error) {
				console.error('Error fetching vouchers:', error);
			} finally {
				setLoadingVouchers(false);
			}
		};

		const fetchTeachers = async () => {
			setLoadingTeachers(true);
			try {
				const teacherData = await getAllTeacher();
				setTeachers(teacherData);
			} catch (error) {
				console.error('Error fetching teachers:', error);
			} finally {
				setLoadingTeachers(false);
			}
		};

		const fetchClasses = async () => {
			setLoadingClasses(true);
			try {
				const classData = await getAllClasses();
				setClasses(classData);
			} catch (error) {
				console.error('Error fetching classes:', error);
			} finally {
				setLoadingClasses(false);
			}
		};

		fetchCourses();
		fetchVouchers();
		fetchTeachers();
		fetchClasses();
	}, []);

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
						rules={[
							{ required: true, message: 'Vui lòng nhập tên trung tâm!' },
						]}
					>
						<Input placeholder="Nhập tên trung tâm" />
					</Form.Item>

					<Form.Item
						name="email"
						label={<span style={{ fontWeight: 'bold' }}>Email</span>}
						rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
					>
						<Input placeholder="Nhập email trung tâm" />
					</Form.Item>

					<Form.Item
						name="phone"
						label={<span style={{ fontWeight: 'bold' }}>Số điện thoại</span>}
						rules={[
							{ required: true, message: 'Vui lòng nhập số điện thoại!' },
							{
								pattern: /^[0-9]+$/,
								message: 'Số điện thoại chỉ được chứa chữ số!',
							},
							{ len: 10, message: 'Số điện thoại phải gồm đúng 10 chữ số!' },
						]}
					>
						<Input
							placeholder="Nhập số điện thoại"
							maxLength={10}
							onKeyPress={(event) => {
								if (!/[0-9]/.test(event.key)) {
									event.preventDefault();
								}
							}}
						/>
					</Form.Item>

					<Form.Item
						name="address"
						label={<span style={{ fontWeight: 'bold' }}>Địa chỉ</span>}
						rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
					>
						<Input placeholder="Nhập địa chỉ trung tâm" />
					</Form.Item>

					{/* Full-width Fields */}
					<Form.Item
						name="courses"
						label={<span style={{ fontWeight: 'bold' }}>Khóa học</span>}
						rules={[{ required: true, message: 'Vui lòng chọn khóa học!' }]}
					>
						<Select
							mode="multiple"
							placeholder="Chọn các khóa học"
							loading={loadingCourses}
							options={courses.map((course) => ({
								label: course.title,
								value: course._id,
							}))}
						/>
					</Form.Item>

					<Form.Item
						name="vouchers"
						label={<span style={{ fontWeight: 'bold' }}>Mã giảm giá</span>}
						rules={[{ required: true, message: 'Vui lòng chọn mã giảm giá!' }]}
					>
						<Select
							mode="multiple"
							placeholder="Chọn các mã giảm giá"
							loading={loadingVouchers}
							options={vouchers.map((voucher) => ({
								label: voucher.title,
								value: voucher._id,
							}))}
						/>
					</Form.Item>

					<Form.Item
						name="teachers"
						label={<span style={{ fontWeight: 'bold' }}>Giáo viên</span>}
						rules={[{ required: true, message: 'Vui lòng chọn giáo viên!' }]}
					>
						<Select
							mode="multiple"
							placeholder="Chọn các giáo viên"
							loading={loadingTeachers}
							options={teachers.map((teacher) => ({
								label: teacher.fullName,
								value: teacher._id,
							}))}
						/>
					</Form.Item>

					<Form.Item
						name="classes"
						label={<span style={{ fontWeight: 'bold' }}>Lớp học</span>}
						rules={[{ required: true, message: 'Vui lòng chọn lớp học!' }]}
					>
						<Select
							mode="multiple"
							placeholder="Chọn các lớp học"
							loading={loadingClasses}
							options={classes.map((classItem) => ({
								label: classItem.name,
								value: classItem._id,
							}))}
						/>
					</Form.Item>

					{/* Submit Button */}
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
