import { EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { Student } from '@/schemas/student.schema';
import { fetchStudentData } from '@/services/custom/getStudentbyToken';
import { formatDateToVietnamTimezone } from '@/utils/dateFormat';

const { Title } = Typography;

const DetailStudent: React.FC = () => {
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
				padding: '10px 90px',
				boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
				borderRadius: '8px',
			}}
		>
			<Title level={2} style={{ textAlign: 'center' }}>
				Thông tin học sinh
			</Title>
			<Row>
				<Col flex={2}>
					<Avatar
						src={student.avatar}
						size={150}
						style={{ display: 'block', margin: '40px auto 0' }}
					/>
				</Col>
				<Col flex={3}>
					<Form
						layout={isMobile ? 'vertical' : 'horizontal'}
						labelCol={isMobile ? {} : { span: 5 }}
						wrapperCol={isMobile ? {} : { span: 19 }}
						style={{ marginTop: '40px' }}
						className="custom-form"
					>
						<Form.Item label="Tên" labelAlign="left">
							<Input value={student.fullName} readOnly />
						</Form.Item>
						<Form.Item label="Email" labelAlign="left">
							<Input value={student.email} readOnly />
						</Form.Item>
						<Form.Item label="Số điện thoại" labelAlign="left">
							<Input value={student.phone} readOnly />
						</Form.Item>
						<Form.Item label="Địa chỉ" labelAlign="left">
							<Input value={student.address} readOnly />
						</Form.Item>
						<Form.Item label="Giới tính" labelAlign="left">
							<Input
								value={student.gender === 'male' ? 'Nam' : 'Nữ'}
								readOnly
							/>
						</Form.Item>
						<Form.Item label="Ngày sinh" labelAlign="left">
							<Input
								value={formatDateToVietnamTimezone(student.dob)}
								readOnly
							/>
						</Form.Item>
						<Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
							<Button
								type="primary"
								icon={<EditOutlined />}
								href="/student/profile/edit"
							>
								Cập nhật
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</div>
	);
};

export default DetailStudent;
