import { Alert, Avatar, Col, Empty, Form, Input, Row, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Student } from '@/schemas/student.schema';
import { apiBaseUrl } from '@/utils/apiBase';
import { formatDateToVietnamTimezone } from '@/utils/dateFormat';

const StudentDetail: React.FC = () => {
	const { studentID } = useParams<{ studentID: string }>();
	const [student, setStudent] = useState<Student | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchStudent = async () => {
		setLoading(true);
		try {
			const fetchStudent = await axios.get(
				`${apiBaseUrl}/api/students/${studentID}`,
			);
			setStudent(fetchStudent.data);
		} catch {
			setError('Không thể tải thông tin chi tiết của học sinh');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchStudent();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [studentID]);

	if (loading) return <Spin size="large" />;
	if (error)
		return <Alert message="Error" description={error} type="error" showIcon />;
	if (!student)
		return (
			<Empty description="Student not found" imageStyle={{ height: 60 }} />
		);

	return (
		<div style={{ paddingLeft: '270px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<div style={{ textAlign: 'left' }}>
					<ButtonGoBack history={true} />
				</div>
				<h2>Thông tin học sinh</h2>
			</div>

			<div
				style={{
					maxWidth: 900,
					margin: '0 auto',
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
					borderRadius: '8px',
					backgroundColor: '#fff',
					padding: '20px',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'flex-start',
					position: 'relative',
				}}
			>
				{/* The form */}
				<Form
					style={{ flex: 1 }}
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 18 }}
					layout="horizontal"
				>
					<Row gutter={[32, 16]} align="top">
						<Col span={7} style={{ display: 'flex', justifyContent: 'center' }}>
							<Avatar
								src={student.avatar}
								size={150}
								style={{ display: 'block', margin: '0 auto' }}
							/>
						</Col>
						<Col span={17}>
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
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	);
};

export default StudentDetail;
