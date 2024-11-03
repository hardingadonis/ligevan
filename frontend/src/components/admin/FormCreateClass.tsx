/* eslint-disable react-hooks/exhaustive-deps */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Center } from '@/schemas/center.schema';
import { Course } from '@/schemas/course.schema';
import { Teacher } from '@/schemas/teacher.schema';
import { apiBaseUrl } from '@/utils/apiBase';

const { Option } = Select;

const ClassForm: React.FC = () => {
	const { centerID } = useParams<{ centerID: string }>();
	const navigate = useNavigate();
	const [center, setCenter] = useState<Center | null>(null);
	const [courses, setCourses] = useState<Course[]>([]);
	const [teachers, setTeachers] = useState<Teacher[]>([]);
	const [form] = Form.useForm();

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

	const fetchCourses = async () => {
		try {
			const courseRequests = (center?.courses ?? []).map((crs: Course) =>
				axios.get<Course>(`${apiBaseUrl}/api/courses/${crs._id}`),
			);
			const courseResponses = await Promise.all(courseRequests);
			const fullCourses = courseResponses.map((response) => response.data);
			setCourses(fullCourses);
		} catch (error) {
			console.error('Không thể tải thông tin khóa học:', error);
		}
	};

	const fetchTeachers = async () => {
		try {
			const teacherRequests = (center?.teachers ?? []).map((tch: Teacher) =>
				axios.get<Teacher>(`${apiBaseUrl}/api/teachers/${tch._id}`),
			);
			const teacherResponses = await Promise.all(teacherRequests);
			const fullTeachers = teacherResponses.map((response) => response.data);
			setTeachers(fullTeachers);
		} catch (error) {
			console.error('Không thể tải thông tin giáo viên:', error);
		}
	};

	useEffect(() => {
		fetchCenter();
	}, [centerID]);

	useEffect(() => {
		if (center) {
			fetchCourses();
			fetchTeachers();
		}
	}, [center]);

	const handleSubmit = async (values: {
		course: string;
		teacher: string;
		name: string;
	}) => {
		const isDuplicateClassName = center?.classes?.some((existingClass) => {
			return existingClass.name === values.name;
		});

		if (isDuplicateClassName) {
			Modal.confirm({
				title: 'Cảnh báo',
				content: 'Lớp học này đã tồn tại với tên đã nhập.',
				centered: true,
				onOk: () => {},
				onCancel: () => {},
			});
			return;
		}

		try {
			const payload = {
				center: centerID,
				course: values.course,
				teacher: values.teacher,
				name: values.name,
				students: [],
				slots: [],
			};

			const response = await axios.post(`${apiBaseUrl}/api/classes`, payload);
			const newClassId = response.data._id;

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

			const updatedClasses = [...existingClasses, newClassId];
			const updatedCourses = existingCourses;
			const updatedVouchers = existingVouchers;
			const updatedTeachers = existingTeachers;

			await axios.put(`${apiBaseUrl}/api/centers/${centerID}`, {
				...center,
				classes: updatedClasses,
				courses: updatedCourses,
				vouchers: updatedVouchers,
				teachers: updatedTeachers,
			});

			const teacherIndex = teachers.findIndex(
				(teacher) => teacher._id === values.teacher,
			);
			if (teacherIndex !== -1) {
				const updatedTeacherClasses = [
					...(teachers[teacherIndex].classes || []),
					newClassId,
				];

				await axios.put(`${apiBaseUrl}/api/teachers/${values.teacher}`, {
					...teachers[teacherIndex],
					classes: updatedTeacherClasses,
				});
			}
			message.success('Tạo lớp học thành công!');
			navigate(`/admin/centers/${centerID}/classes`);
		} catch (error) {
			console.error('Không thể tạo lớp học mới:', error);
		}
	};

	const existingCourseIds =
		center?.classes?.map((cls) => cls.course as unknown as string) || [];
	const filteredCourses = courses.filter(
		(course) => !existingCourseIds.includes(course._id),
	);
	const filteredTeachers = teachers.filter(
		(teacher) => teacher.classes && teacher.classes.length < 1,
	);

	return (
		<div style={{ paddingLeft: '270px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<div style={{ textAlign: 'left' }}>
					<ButtonGoBack />
				</div>
				<h2>Tạo lớp học mới</h2>
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
						<Input value={center?.name} disabled />
					</Form.Item>

					<Form.Item
						name="course"
						label="Khóa học"
						rules={[{ required: true, message: 'Vui lòng chọn khóa học' }]}
					>
						<Select placeholder="Chọn khóa học">
							{filteredCourses.map((course) => (
								<Option key={course._id} value={course._id}>
									{course.code}
								</Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item
						name="teacher"
						label="Giáo viên"
						rules={[{ required: true, message: 'Vui lòng chọn giáo viên' }]}
					>
						<Select placeholder="Chọn giáo viên">
							{filteredTeachers.map((teacher) => (
								<Option key={teacher._id} value={teacher._id}>
									{teacher.fullName}
								</Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item
						name="name"
						label="Tên lớp học"
						rules={[{ required: true, message: 'Vui lòng nhập tên lớp học' }]}
					>
						<Input placeholder="Nhập tên lớp học" />
					</Form.Item>

					<Form.Item style={{ textAlign: 'right' }}>
						<Button
							type="primary"
							icon={<PlusOutlined />}
							htmlType="submit"
							style={{ backgroundColor: '#0cd14e', color: '#fff' }}
						>
							Tạo lớp học mới
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default ClassForm;
