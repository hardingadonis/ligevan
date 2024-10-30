import { Avatar, Col, Form, Input, Row, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Teacher } from '@/schemas/teacher.schema';
import { getTeacherById } from '@/services/api/teacher';
import { formatDateToVietnamTimezone } from '@/utils/dateFormat';

const TeacherDetailOfCenter: React.FC = () => {
	const { teacherID } = useParams<{ teacherID: string }>();
	const [centerID, setCenterID] = useState<string>('');
	const [teacher, setTeacher] = useState<Teacher | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchVoucher = async () => {
			if (!teacherID) return;
			try {
				const fetchTeacher = await getTeacherById(teacherID);
				setTeacher(fetchTeacher);
				setCenterID(fetchTeacher.center._id);
			} catch (error) {
				console.error('Không thể tải thông tin giáo viên:', error);
			} finally {
				setLoading(false);
			}
		};

		if (teacherID) {
			fetchVoucher();
		}
	}, [teacherID]);

	if (loading) {
		return (
			<div style={{ textAlign: 'center', padding: '20px' }}>
				<Spin size="large" />
			</div>
		);
	}

	if (!teacher) {
		return <div>Không tìm thấy giáo viên</div>;
	}

	return (
		<div style={{ paddingLeft: '270px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<div style={{ textAlign: 'left' }}>
					<ButtonGoBack link={`/admin/centers/${centerID}/teachers`} />
				</div>
				<Typography.Title level={2}>Thông tin giáo viên</Typography.Title>
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
				<Form
					style={{ flex: 1 }}
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 18 }}
					layout="horizontal"
				>
					<Row gutter={[32, 16]} align="top">
						<Col span={7} style={{ display: 'flex', justifyContent: 'center' }}>
							<Avatar
								src={teacher.avatar}
								size={150}
								style={{ display: 'block', margin: '0 auto' }}
							/>
						</Col>
						<Col span={17}>
							<Form.Item label="Tên" labelAlign="left">
								<Input value={teacher.fullName} readOnly />
							</Form.Item>
							<Form.Item label="Email" labelAlign="left">
								<Input value={teacher.email} readOnly />
							</Form.Item>
							<Form.Item label="Số điện thoại" labelAlign="left">
								<Input value={teacher.phone} readOnly />
							</Form.Item>
							<Form.Item label="Địa chỉ" labelAlign="left">
								<Input value={teacher.address} readOnly />
							</Form.Item>
							<Form.Item label="Giới tính" labelAlign="left">
								<Input
									value={teacher.gender === 'male' ? 'Nam' : 'Nữ'}
									readOnly
								/>
							</Form.Item>
							<Form.Item label="Ngày sinh" labelAlign="left">
								<Input
									value={formatDateToVietnamTimezone(teacher.dob)}
									readOnly
								/>
							</Form.Item>

							<div
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
								}}
							></div>
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	);
};

export default TeacherDetailOfCenter;
