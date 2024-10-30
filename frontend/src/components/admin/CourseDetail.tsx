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

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Course } from '@/schemas/course.schema';
import { deleteCourse, getCourseById } from '@/services/api/course';
import { formatPrice } from '@/utils/formatPrice';

const { Title } = Typography;

const CourseDetail: React.FC = () => {
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
		navigate(`/admin/courses/edit/${course._id}`);
	};

	const handleDelete = async () => {
		Modal.confirm({
			title: 'Xác nhận xóa',
			content: 'Bạn có chắc chắn muốn xóa mã giảm giá này?',
			okText: 'Xóa',
			cancelText: 'Hủy',
			centered: true,
			onOk: async () => {
				try {
					await deleteCourse(course._id);
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
		<div style={{ paddingLeft: '270px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<div style={{ textAlign: 'left' }}>
					<ButtonGoBack />
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
				<div style={{ marginTop: '40px', textAlign: 'right' }}>
					<Button
						type="primary"
						icon={<EditOutlined />}
						onClick={handleEdit}
						style={{
							marginRight: '20px',
							backgroundColor: '#ffae00',
							color: 'white',
						}}
					>
						Chỉnh sửa
					</Button>
					<Button
						type="primary"
						danger
						icon={<DeleteOutlined />}
						onClick={handleDelete}
						style={{
							backgroundColor: '#ff2121',
							color: 'white',
						}}
					>
						Xóa
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default CourseDetail;
