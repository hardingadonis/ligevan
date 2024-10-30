import { Card, Col, Input, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Course } from '@/schemas/course.schema';
import { getCourseById } from '@/services/api/course';
import { selectCenterID } from '@/slices/center';
import { formatPrice } from '@/utils/formatPrice';

const { Title } = Typography;

const CourseDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [course, setCourse] = useState<Course | null>(null);
	const centerID = useSelector(selectCenterID);
	useEffect(() => {
		const fetchCourseDetail = async () => {
			try {
				if (!id) {
					console.error('No ID provided');
					return;
				}
				const fetchedCourse = await getCourseById(id);
				setCourse(fetchedCourse);
			} catch (error) {
				console.error('Error fetching course detail:', error);
			}
		};

		fetchCourseDetail();
	}, [id]);

	if (!course) {
		return <div>Loading...</div>;
	}

	return (
		<div style={{ paddingLeft: '270px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<div style={{ textAlign: 'left' }}>
					<ButtonGoBack link={`/admin/centers/${centerID}/courses`} />
				</div>
				<h2>Chi tiết khóa học</h2>
			</div>

			<Card
				style={{
					maxWidth: '1000px',
					margin: '0 auto',
					padding: '10px 90px',
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
					borderRadius: '8px',
					backgroundColor: '#f5f5f5',
				}}
			>
				<Row gutter={[16, 16]}>
					<Col span={12}>
						<Title level={5}>Mã khóa học</Title>
						<Input
							value={course.code}
							style={{ backgroundColor: '#fff', borderRadius: '5px' }}
							readOnly
						/>
					</Col>
					<Col span={12}>
						<Title level={5}>Giá</Title>
						<Input
							value={formatPrice(course.price)}
							style={{ backgroundColor: '#fff', borderRadius: '5px' }}
							readOnly
						/>
					</Col>
				</Row>

				<Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
					<Col span={12}>
						<Title level={5}>Tên khóa học</Title>
						<Input
							value={course.title}
							style={{ backgroundColor: '#fff', borderRadius: '5px' }}
							readOnly
						/>
					</Col>
					<Col span={12}>
						<Title level={5}>Mô tả</Title>
						<Input
							value={course.description || 'Không có mô tả'}
							style={{ backgroundColor: '#fff', borderRadius: '5px' }}
							readOnly
						/>
					</Col>
				</Row>

				<Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
					<Col span={24}>
						<Card
							style={{
								backgroundColor: '#fff',
								borderRadius: '5px',
								padding: '10px',
								textAlign: 'center',
								boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
								width: '80%',
								margin: '0 auto',
							}}
						>
							<Title level={5}>Ảnh mô tả</Title>
							<img
								src={course.thumbnail}
								alt="Thumbnail"
								style={{
									maxWidth: '100%',
									maxHeight: '200px',
									objectFit: 'contain',
								}}
							/>
						</Card>
					</Col>
				</Row>
			</Card>
		</div>
	);
};

export default CourseDetail;
