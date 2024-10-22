import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Center } from '@/schemas/center.schema';
import { getCenterById } from '@/services/api/center';

const { Title } = Typography;

const DetailOfCenter: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [center, setCenter] = useState<Center | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCenterDetail = async () => {
			try {
				if (!id) {
					console.error('No ID provided');
					return;
				}
				const fetchedCenter = await getCenterById(id);
				setCenter(fetchedCenter);
			} catch (error) {
				console.error('Error fetching center detail:', error);
			}
		};

		fetchCenterDetail();
	}, [id]);

	if (!center) {
		return <div>Loading...</div>;
	}

	const handleEdit = () => {
		console.log(`Chỉnh sửa trung tâm: ${center._id}`);
	};

	const handleDelete = () => {
		console.log(`Xóa trung tâm: ${center._id}`);
	};

	return (
		<div style={{ padding: '0 20px 0 270px' }}>
			<Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
				Chi tiết trung tâm
			</Title>

			{/* Card wrapping Tên, Email, Địa chỉ, Phone, and Buttons */}
			<Card
				style={{
					padding: '20px',
					borderRadius: '8px',
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
					backgroundColor: '#f5f5f5',
				}}
			>
				{/* Row for Tên and Email */}
				<Row gutter={[16, 16]}>
					<Col span={12}>
						<Title level={5}>Tên</Title>
						<Input
							value={center.name}
							style={{ backgroundColor: '#fff', borderRadius: '5px' }}
						/>
					</Col>
					<Col span={12}>
						<Title level={5}>Email</Title>
						<Input
							value={center.email || 'Không có email'}
							style={{ backgroundColor: '#fff', borderRadius: '5px' }}
						/>
					</Col>
				</Row>

				{/* Row for Địa chỉ and Phone */}
				<Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
					<Col span={12}>
						<Title level={5}>Địa chỉ</Title>
						<Input
							value={center.address}
							style={{ backgroundColor: '#fff', borderRadius: '5px' }}
						/>
					</Col>
					<Col span={12}>
						<Title level={5}>Số điện thoại</Title>
						<Input
							value={center.phone}
							style={{ backgroundColor: '#fff', borderRadius: '5px' }}
						/>
					</Col>
				</Row>

				{/* Buttons for Courses, Vouchers, Classes, Teachers */}
				<div style={{ marginTop: '40px' }}>
					<Row gutter={[16, 16]}>
						<Col span={6}>
							<Button
								type="primary"
								icon={<EyeOutlined style={{ color: 'blue' }} />}
								onClick={() => navigate(`/admin/centers/${id}/courses`)}
								style={{
									backgroundColor: 'white',
									borderColor: 'blue',
									color: 'blue',
									width: '100%',
									height: '35px',
								}}
							>
								Khóa học
							</Button>
						</Col>
						<Col span={6}>
							<Button
								type="primary"
								icon={<EyeOutlined style={{ color: 'blue' }} />}
								onClick={() => navigate(`/admin/centers/${id}/vouchers`)}
								style={{
									backgroundColor: 'white',
									borderColor: 'blue',
									color: 'blue',
									width: '100%',
									height: '35px',
								}}
							>
								Mã giảm giá
							</Button>
						</Col>
						<Col span={6}>
							<Button
								type="primary"
								icon={<EyeOutlined style={{ color: 'blue' }} />}
								onClick={() => navigate(`/admin/centers/${id}/classes`)}
								style={{
									backgroundColor: 'white',
									borderColor: 'blue',
									color: 'blue',
									width: '100%',
									height: '35px',
								}}
							>
								Lớp học
							</Button>
						</Col>
						<Col span={6}>
							<Button
								type="primary"
								icon={<EyeOutlined style={{ color: 'blue' }} />}
								onClick={() => navigate(`/admin/centers/${id}/teachers`)}
								style={{
									backgroundColor: 'white',
									borderColor: 'blue',
									color: 'blue',
									width: '100%',
									height: '35px',
								}}
							>
								Giáo viên
							</Button>
						</Col>
					</Row>
				</div>
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

export default DetailOfCenter;
