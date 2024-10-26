import { Alert, Col, Descriptions, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Payment } from '@/schemas/payment.schema';
import { getPaymentByID } from '@/services/api/payment';
import { formatDateTimeToVietnamTimezone } from '@/utils/dateFormat';

const PaymentDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [paymentDetail, setPaymentDetail] = useState<Payment | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchPaymentDetail = async () => {
		try {
			if (id) {
				const payment = await getPaymentByID(id);
				setPaymentDetail(payment);
			}
		} catch (err) {
			console.error('Error fetching payment detail:', err);
			setError('Error fetching payment detail');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPaymentDetail();
	});

	return (
		<div>
			<Row>
				<Col span={2}>
					<ButtonGoBack />
				</Col>
				<Col span={20}>
					<div style={{ textAlign: 'center', marginBottom: 20 }}>
						<h2>Chi tiết lịch sử thanh toán</h2>
					</div>
				</Col>
			</Row>

			<div
				style={{
					maxWidth: '1000px',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				{loading && <Spin size="large" />}
				{error && (
					<Alert message="Lỗi" description={error} type="error" showIcon />
				)}
				{paymentDetail && !loading && !error && (
					<Descriptions
						bordered
						column={1}
						size="middle"
						labelStyle={{ fontWeight: 'bold', width: '30%' }}
						contentStyle={{ textAlign: 'right' }}
						style={{ width: '100%', maxWidth: '800px' }}
					>
						<Descriptions.Item label="Tên khóa học">
							{paymentDetail.course.title}
						</Descriptions.Item>
						<Descriptions.Item label="Tên lớp học">
							{paymentDetail.class.name}
						</Descriptions.Item>
						<Descriptions.Item label="Mã giảm giá">
							{paymentDetail.voucher ? paymentDetail.voucher.code : 'N/A'}
						</Descriptions.Item>
						<Descriptions.Item label="Phương thức thanh toán">
							{paymentDetail.method}
						</Descriptions.Item>
						<Descriptions.Item label="Thời gian thanh toán">
							{paymentDetail.createdAt
								? formatDateTimeToVietnamTimezone(
										new Date(paymentDetail.createdAt),
									)
								: 'N/A'}
						</Descriptions.Item>
						<Descriptions.Item label="Giá gốc">
							{paymentDetail.originPrice.toLocaleString()} VNĐ
						</Descriptions.Item>
						<Descriptions.Item
							label="Giảm giá"
							contentStyle={{ fontWeight: 'bold', color: '#ff4d4f' }}
						>
							{paymentDetail.voucher
								? `${paymentDetail.voucher.value}%`
								: 'N/A'}
						</Descriptions.Item>
						<Descriptions.Item label="Giá cuối cùng">
							{paymentDetail.finalPrice.toLocaleString()} VNĐ
						</Descriptions.Item>
					</Descriptions>
				)}
			</div>
		</div>
	);
};

export default PaymentDetail;
