import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Voucher } from '@/schemas/voucher.schema';
import { deleteVoucher, getVoucherById } from '@/services/api/voucher';
import { formatDateToVietnamTimezone } from '@/utils/dateFormat';

const VoucherDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [voucher, setVoucher] = useState<Voucher | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchVoucher = async () => {
			if (!id) return;
			try {
				const fetchedVoucher = await getVoucherById(id);
				setVoucher(fetchedVoucher);
			} catch (error) {
				console.error('Lỗi khi lấy chi tiết mã giảm giá:', error);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchVoucher();
		}
	}, [id]);

	const handleEdit = (id: string) => {
		navigate(`/admin/vouchers/${id}/edit`);
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
					await deleteVoucher(id);
					message.success('Mã giảm giá đã được xóa thành công!', 3);
					navigate(`/admin/vouchers`);
				} catch (error) {
					console.error('Lỗi khi xóa mã giảm giá:', error);
					message.error('Lỗi: Đã xảy ra lỗi khi xóa mã giảm giá!', 3);
				}
			},
		});
	};

	if (loading) {
		return (
			<div style={{ textAlign: 'center', padding: '20px' }}>
				<Spin size="large" />
			</div>
		);
	}

	if (!voucher) {
		return <div>Không tìm thấy mã giảm giá</div>;
	}

	return (
		<div style={{ paddingLeft: '270px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<div style={{ textAlign: 'left' }}>
					<ButtonGoBack />
				</div>
				<h2>Chi tiết mã giảm giá</h2>
			</div>

			<div
				style={{
					maxWidth: 1000,
					margin: '0 auto',
					padding: '10px 90px',
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
					borderRadius: '8px',
					backgroundColor: '#f5f5f5',
				}}
			>
				<Row>
					<Col span={24}>
						<Form
							layout="vertical"
							labelCol={{ span: 24 }}
							wrapperCol={{ span: 24 }}
							style={{ marginTop: '40px' }}
							className="custom-form"
						>
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(2, 1fr)',
									gap: '16px',
									marginBottom: '16px',
								}}
							>
								<Form.Item
									style={{ fontWeight: 'bold' }}
									label="Mã giảm giá"
									labelAlign="left"
								>
									<Input value={voucher.code} readOnly />
								</Form.Item>
								<Form.Item
									style={{ fontWeight: 'bold' }}
									label="Giá trị"
									labelAlign="left"
								>
									<Input value={`${voucher.value}%`} readOnly />
								</Form.Item>
							</div>

							<Form.Item
								style={{ fontWeight: 'bold' }}
								label="Tiêu đề"
								labelAlign="left"
							>
								<Input value={voucher.title} readOnly />
							</Form.Item>
							<Form.Item
								style={{ fontWeight: 'bold' }}
								label="Mô tả"
								labelAlign="left"
							>
								<Input value={voucher.description} readOnly />
							</Form.Item>
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(2, 1fr)',
									gap: '16px',
									marginBottom: '16px',
								}}
							>
								<Form.Item
									style={{ fontWeight: 'bold' }}
									label="Thời gian bắt đầu"
									labelAlign="left"
								>
									<Input
										value={formatDateToVietnamTimezone(new Date(voucher.start))}
										readOnly
									/>
								</Form.Item>

								<Form.Item
									style={{ fontWeight: 'bold' }}
									label="Thời gian kết thúc"
									labelAlign="left"
								>
									<Input
										value={formatDateToVietnamTimezone(new Date(voucher.end))}
										readOnly
									/>
								</Form.Item>
							</div>

							<Form.Item
								wrapperCol={{ span: 24 }}
								style={{ textAlign: 'right' }}
							>
								<>
									<Button
										style={{
											backgroundColor: '#ffae00',
											color: 'white',
											marginRight: 8,
										}}
										icon={<EditOutlined />}
										onClick={() => id && handleEdit(id)}
									>
										Chỉnh sửa
									</Button>
									<Button
										style={{
											backgroundColor: '#ff2121',
											color: 'white',
										}}
										icon={<DeleteOutlined />}
										onClick={() => id && handleDelete(id)}
									>
										Xóa
									</Button>
								</>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default VoucherDetail;
