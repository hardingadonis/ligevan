import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
	Button,
	Card,
	Col,
	Input,
	Modal,
	Row,
	Typography,
	notification,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Course } from '@/schemas/course.schema';
import { deleteCourse, getCourseById } from '@/services/api/course';
import { formatPrice } from '@/utils/formatPrice';

const { Title } = Typography;

const DetailOfCourse: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [course, setCourse] = useState<Course | null>(null);
	const navigate = useNavigate();
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

	const handleDelete = async (id: string) => {
		Modal.confirm({
			title: 'Xác nhận xóa',
			content: 'Bạn có chắc chắn muốn xóa mã giảm giá này?',
			okText: 'Xóa',
			cancelText: 'Hủy',
			centered: true,
			onOk: async () => {
				try {
					await deleteCourse(id);
					notification.success({
						message: 'Xóa thành công',
						description: 'Mã giảm giá đã được xóa thành công.',
						duration: 3,
					});
					navigate(`/admin/courses`);
				} catch (error) {
					console.error('Lỗi khi xóa mã giảm giá:', error);
					notification.error({
						message: 'Lỗi',
						description: 'Đã xảy ra lỗi khi xóa mã giảm giá.',
						duration: 3,
					});
				}
			},
		});
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
					onClick={() => id && handleDelete(id)}
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
