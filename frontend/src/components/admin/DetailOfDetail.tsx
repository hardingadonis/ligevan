import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Center } from '@/schemas/center.schema';
import { getCenterById } from '@/services/api/center';

const { Title, Text } = Typography;

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

	const renderField = (label: string, value: string) => (
		<Card
			style={{
				backgroundColor: '#f5f5f5',
				borderRadius: '10px',
				marginBottom: '20px',
				padding: '10px',
			}}
		>
			<Title level={5} style={{ marginBottom: '5px' }}>
				{label}
			</Title>
			<Text>{value}</Text>
		</Card>
	);

	return (
		<div style={{ padding: '65px 20px 0 270px' }}>
			<Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
				Chi tiết trung tâm
			</Title>

			{/* Row for Tên and Email */}
			<Row gutter={[16, 16]}>
				<Col span={12}>{renderField('Tên', center.name)}</Col>
				<Col span={12}>
					{renderField('Email', center.email || 'Không có email')}
				</Col>
			</Row>

			{/* Row for Địa chỉ and Phone */}
			<Row gutter={[16, 16]}>
				<Col span={12}>{renderField('Địa chỉ', center.address)}</Col>
				<Col span={12}>{renderField('Số điện thoại', center.phone)}</Col>
			</Row>

			{/* Button for Courses, Vouchers, Classes, Teachers */}
			<Row gutter={[16, 16]}>
				<Col span={6}>
					<Button
						type="primary"
						block
						onClick={() => navigate(`/admin/centers/${id}/courses`)}
						style={{
							backgroundColor: '#556359',
							borderColor: '#556359',
						}}
					>
						Chi tiết Khóa học
					</Button>
				</Col>
				<Col span={6}>
					<Button
						type="primary"
						block
						onClick={() => navigate(`/admin/centers/${id}/vouchers`)}
						style={{
							backgroundColor: '#556359',
							borderColor: '#556359',
						}}
					>
						Chi tiết Mã giảm giá
					</Button>
				</Col>
				<Col span={6}>
					<Button
						type="primary"
						block
						onClick={() => navigate(`/admin/centers/${id}/classes`)}
						style={{
							backgroundColor: '#556359',
							borderColor: '#556359',
						}}
					>
						Chi tiết Lớp học
					</Button>
				</Col>
				<Col span={6}>
					<Button
						type="primary"
						block
						onClick={() => navigate(`/admin/centers/${id}/teachers`)}
						style={{
							backgroundColor: '#556359',
							borderColor: '#556359',
						}}
					>
						Chi tiết Giáo viên
					</Button>
				</Col>
			</Row>

			{/* Edit and Delete buttons */}
			<div style={{ marginTop: '30px', textAlign: 'center' }}>
				<Button
					type="primary"
					icon={<EditOutlined />}
					onClick={handleEdit}
					style={{
						marginRight: '10px',
						backgroundColor: '#4CAF50', // Custom green color for edit
						borderColor: '#4CAF50',
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
						backgroundColor: '#f44336', // Custom red color for delete
						borderColor: '#f44336',
					}}
				>
					Xóa
				</Button>
			</div>
		</div>
	);
};

export default DetailOfCenter;
