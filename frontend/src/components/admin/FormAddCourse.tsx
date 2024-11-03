/* eslint-disable react-hooks/exhaustive-deps */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Center } from '@/schemas/center.schema';
import { Course } from '@/schemas/course.schema';
import { apiBaseUrl } from '@/utils/apiBase';
import { formatPrice } from '@/utils/formatPrice';

const { Option } = Select;

const AddCourseForm: React.FC = () => {
	const { centerID } = useParams<{ centerID: string }>();
	const navigate = useNavigate();
	const [center, setCenter] = useState<Center | null>(null);
	const [courses, setCourses] = useState<Course[]>([]);
	const [form] = Form.useForm();
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

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
			const response = await axios.get<Course[]>(`${apiBaseUrl}/api/courses`);
			setCourses(response.data);
		} catch (error) {
			console.error('Không thể tải thông tin khóa học:', error);
		}
	};

	useEffect(() => {
		fetchCenter();
		fetchCourses();
	}, [centerID]);

	const handleCourseChange = (courseId: string) => {
		const course = courses.find((c) => c._id === courseId);
		setSelectedCourse(course || null);
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

			const updatedClasses = existingClasses;
			const updatedCourses = [...existingCourses, selectedCourse?._id];
			const updatedVouchers = existingVouchers;
			const updatedTeachers = existingTeachers;

			await axios.put(`${apiBaseUrl}/api/centers/${centerID}`, {
				...center,
				classes: updatedClasses,
				courses: updatedCourses,
				vouchers: updatedVouchers,
				teachers: updatedTeachers,
			});
			message.success('Thêm khóa học thành công!');
			navigate(`/admin/centers/${centerID}/courses`);
		} catch (error) {
			console.error('Không thể cập nhật trung tâm:', error);
		}
	};

	const existingCourseIds = center?.courses?.map((course) => course._id) || [];
	const filteredCourses = courses.filter(
		(course) => !existingCourseIds.includes(course._id),
	);

	return (
		<div style={{ paddingLeft: '270px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<div style={{ textAlign: 'left' }}>
					<ButtonGoBack />
				</div>
				<h2>Thêm khóa học vào trung tâm</h2>
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
						name="course"
						label="Khóa học"
						rules={[{ required: true, message: 'Vui lòng chọn khóa học' }]}
					>
						<Select placeholder="Chọn khóa học" onChange={handleCourseChange}>
							{filteredCourses.map((course) => (
								<Option key={course._id} value={course._id}>
									{course.code}
								</Option>
							))}
						</Select>
					</Form.Item>
					{selectedCourse && (
						<>
							<Form.Item label="Tên khóa học">
								<Input value={selectedCourse.title} readOnly />
							</Form.Item>
							<Form.Item label="Mô tả khóa học">
								<Input value={selectedCourse.description} readOnly />
							</Form.Item>
							<Form.Item label="Giá khóa học">
								<Input value={formatPrice(selectedCourse.price)} readOnly />
							</Form.Item>

							<Form.Item label="Ảnh mô tả">
								<img
									src={selectedCourse.thumbnail}
									alt="Thumbnail"
									style={{
										maxWidth: '100%',
										maxHeight: '200px',
										objectFit: 'contain',
									}}
								/>
							</Form.Item>
						</>
					)}

					<Form.Item style={{ textAlign: 'right' }}>
						<Button
							type="primary"
							icon={<PlusOutlined />}
							htmlType="submit"
							style={{ backgroundColor: '#0cd14e', color: '#fff' }}
						>
							Thêm khóa học
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default AddCourseForm;
