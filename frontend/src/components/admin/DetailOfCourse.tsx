import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Course } from '@/schemas/course.schema';
import { getCourseById } from '@/services/api/course';
import { formatPrice } from '@/utils/formatPrice';

// Import hàm formatPrice

const { Title } = Typography;

const DetailOfCourse: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [course, setCourse] = useState<Course | null>(null);

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

	const handleEdit = () => {
		console.log(`Chỉnh sửa khóa học: ${course._id}`);
	};

	const handleDelete = () => {
		console.log(`Xóa khóa học: ${course._id}`);
	};

	return (
		<div style={{ padding: '0 20px 0 270px' }}>
			<Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
				Chi tiết Khóa học
			</Title>

			<Card
				style={{
					padding: '20px',
					borderRadius: '8px',
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
					backgroundColor: '#f5f5f5',
					width: '900px',
					margin: '0 auto',
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
							<Title level={5}>Thumbnail</Title>
							<img
								src={course.thumbnail}
								alt="Thumbnail"
								style={{
									maxWidth: '100%',
									maxHeight: '150px',
									objectFit: 'contain',
								}}
							/>
						</Card>
					</Col>
				</Row>
			</Card>

			<div style={{ marginTop: '60px', textAlign: 'right' }}>
				<Button
					type="primary"
					icon={<EditOutlined style={{ color: 'blue' }} />}
					onClick={handleEdit}
					style={{
						marginRight: '20px',
						backgroundColor: 'white',
						borderColor: 'blue',
						color: 'blue',
					}}
				>
					Chỉnh sửa
				</Button>
				<Button
					type="primary"
					danger
					icon={<DeleteOutlined style={{ color: 'red' }} />}
					onClick={handleDelete}
					style={{
						backgroundColor: 'white',
						borderColor: 'red',
						color: 'red',
					}}
				>
					Xóa
				</Button>
			</div>
		</div>
	);
};

export default DetailOfCourse;
