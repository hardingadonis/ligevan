import { EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import '@/assets/styles/detailStudent.css';
import { Student } from '@/schemas/student.schema';
import { getStudentByEmail } from '@/services/api/student';
import { formatDateToVietnamTimezone } from '@/utils/dateFormat';
import { decodeToken } from '@/utils/jwtDecode';

const { Title } = Typography;

const DetailStudent: React.FC = () => {
	const [student, setStudent] = useState<Student | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchStudent = async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					throw new Error('No token found');
				}

				const decoded = decodeToken(token);
				const email = decoded.sub;

				const studentData = await getStudentByEmail(email);
				setStudent(studentData);
			} catch (error) {
				console.error('Error fetching student:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchStudent();
	}, []);

	if (loading) {
		return <div>Đang tải...</div>;
	}

	if (!student) {
		return <div>Không tìm thấy dữ liệu của học sinh.</div>;
	}

	return (
		<div
			style={{
				maxWidth: 900,
				margin: '0 auto',
				padding: '10px 100px',
				boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
				borderRadius: '8px',
			}}
		>
			<Title level={2} style={{ textAlign: 'center' }}>
				Thông tin học sinh
			</Title>
			<Form
				layout="horizontal"
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 18 }}
				style={{ marginTop: '40px' }}
				className="custom-form"
			>
				<Form.Item label="Tên" labelAlign="left">
					<Input value={student.fullName} disabled />
				</Form.Item>
				<Form.Item label="Email" labelAlign="left">
					<Input value={student.email} disabled />
				</Form.Item>
				<Form.Item label="Số điện thoại" labelAlign="left">
					<Input value={student.phone} disabled />
				</Form.Item>
				<Form.Item label="Địa chỉ" labelAlign="left">
					<Input value={student.address} disabled />
				</Form.Item>
				<Form.Item label="Giới tính" labelAlign="left">
					<Input value={student.gender === 'male' ? 'Nam' : 'Nữ'} disabled />
				</Form.Item>
				<Form.Item label="Ngày sinh" labelAlign="left">
					<Input value={formatDateToVietnamTimezone(student.dob)} disabled />
				</Form.Item>
				<Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
					<Button
						type="primary"
						icon={<EditOutlined />}
						href="/student/profile/edit"
					>
						Cập nhật
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default DetailStudent;
