import { Col, Form, Input, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Voucher } from '@/schemas/voucher.schema';
import { getVoucherById } from '@/services/api/voucher';
import { selectCenterID } from '@/slices/center';
import { formatDateToVietnamTimezone } from '@/utils/dateFormat';

const VoucherDetailOfCenter: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [voucher, setVoucher] = useState<Voucher | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const centerID = useSelector(selectCenterID);

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
					<ButtonGoBack link={`/admin/centers/${centerID}/vouchers`} />
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
							></Form.Item>
						</Form>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default VoucherDetailOfCenter;
