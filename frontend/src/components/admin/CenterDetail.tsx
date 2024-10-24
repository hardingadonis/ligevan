import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import {
	Button,
	Card,
	Col,
	Input,
	Modal,
	Row,
	Tooltip,
	Typography,
	notification,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Center } from '@/schemas/center.schema';
import { deleteCenter, getCenterById } from '@/services/api/center';

// Import deleteCenter API

const { Title } = Typography;

const CenterDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [center, setCenter] = useState<Center | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCenterDetail = async () => {
			if (!id) {
				console.error('No ID provided');
				return;
			}
			try {
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
		navigate(`/admin/centers/edit/${center._id}`);
	};

	const handleDelete = async () => {
		Modal.confirm({
			title: 'Xác nhận xóa',
			content: 'Bạn có chắc chắn muốn xóa trung tâm này?',
			okText: 'Xóa',
			cancelText: 'Hủy',
			centered: true,
			onOk: async () => {
				try {
					await deleteCenter(center._id); // Call the delete API
					notification.success({
						message: 'Xóa thành công',
						description: 'Trung tâm đã được xóa thành công.',
						duration: 3,
					});
					navigate(`/admin/centers`); // Navigate back to the centers list
				} catch (error) {
					console.error('Lỗi khi xóa trung tâm:', error);
					notification.error({
						message: 'Lỗi',
						description: 'Đã xảy ra lỗi khi xóa trung tâm.',
						duration: 3,
					});
				}
			},
		});
	};

	const buttonStyle = {
		backgroundColor: 'white',
		borderColor: 'blue',
		color: 'blue',
		width: '100%',
		height: '35px',
	};

	const handleNavigation = (path: string) =>
		navigate(`/admin/centers/${id}/${path}`);

	const sections = [
		{ label: 'Khóa học', path: 'courses' },
		{ label: 'Mã giảm giá', path: 'vouchers' },
		{ label: 'Lớp học', path: 'classes' },
		{ label: 'Giáo viên', path: 'teachers' },
	];

	return (
		<div style={{ paddingLeft: '270px' }}>
			<Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
				Chi tiết trung tâm
			</Title>

			<Card
				style={{
					padding: '20px',
					borderRadius: '8px',
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
					backgroundColor: '#f5f5f5',
				}}
			>
				<Row gutter={[16, 16]}>
					<Col span={12}>
						<Title level={5}>Tên</Title>
						<Input
							value={center.name}
							style={{ backgroundColor: '#fff', borderRadius: '5px' }}
							readOnly
						/>
					</Col>
					<Col span={12}>
						<Title level={5}>Email</Title>
						<Input
							value={center.email || 'Không có email'}
							style={{ backgroundColor: '#fff', borderRadius: '5px' }}
							readOnly
						/>
					</Col>
				</Row>

				<Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
					<Col span={12}>
						<Title level={5}>Địa chỉ</Title>
						<Input
							value={center.address}
							style={{ backgroundColor: '#fff', borderRadius: '5px' }}
							readOnly
						/>
					</Col>
					<Col span={12}>
						<Title level={5}>Số điện thoại</Title>
						<Input
							value={center.phone}
							style={{ backgroundColor: '#fff', borderRadius: '5px' }}
							readOnly
						/>
					</Col>
				</Row>

				<div style={{ marginTop: '40px' }}>
					<Row gutter={[16, 16]}>
						{sections.map(({ label, path }) => (
							<Col span={6} key={path}>
								<Tooltip title="Nhấn để xem chi tiết">
									<Button
										icon={<EyeOutlined style={{ color: 'blue' }} />}
										style={buttonStyle}
										onClick={() => handleNavigation(path)}
										onMouseOver={(e) => {
											e.currentTarget.style.backgroundColor = '#1890ff';
											e.currentTarget.style.color = 'white';
										}}
										onMouseOut={(e) => {
											e.currentTarget.style.backgroundColor = 'white';
											e.currentTarget.style.color = 'blue';
										}}
									>
										{label}
									</Button>
								</Tooltip>
							</Col>
						))}
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

export default CenterDetail;