import { EyeOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Empty, Input, Row, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Payment } from '@/schemas/payment.schema';
import { getPaymentByID } from '@/services/api/payment';
import { getTeacherById } from '@/services/api/teacher';
import { fetchStudentData } from '@/services/custom/getStudentbyToken';

interface PaymentWithDetails extends Payment {
	className?: string;
	teacherName?: string;
	courseTitle?: string;
}

const PaymentHistory: React.FC = () => {
	const [payments, setPayments] = useState<PaymentWithDetails[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [searchText, setSearchText] = useState<string>('');
	const navigate = useNavigate();

	const fetchPaymentHistory = async () => {
		try {
			const studentData = await fetchStudentData();

			if (studentData?.payments) {
				const paymentDetailsPromises = studentData.payments.map(
					async (payment) => {
						try {
							const paymentDetail = await getPaymentByID(payment._id);
							const teacher = await getTeacherById(
								paymentDetail.class?.teacher?.toString() ?? '',
							);
							return {
								...paymentDetail,
								className: paymentDetail.class?.name ?? 'N/A',
								courseTitle: paymentDetail.course?.title ?? 'N/A',
								teacherName: teacher?.fullName ?? 'N/A',
							};
						} catch (paymentError) {
							console.error(
								'Error fetching payment details for ID:',
								payment._id,
								paymentError,
							);
							return {
								...payment,
								className: 'N/A',
								teacherName: 'N/A',
								courseTitle: 'N/A',
							};
						}
					},
				);

				const detailedPayments = await Promise.all(paymentDetailsPromises);
				setPayments(detailedPayments);
			} else {
				console.error('Student data is undefined or payments are empty');
			}
		} catch (error) {
			console.error('Error fetching payment history:', error);
			setError('Error fetching payment history');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPaymentHistory();
	}, []);

	const handleViewDetails = (id: string) => {
		navigate(`/student/payment-history/${id}`);
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	const handleRefresh = () => {
		fetchPaymentHistory();
	};

	const filteredPayments = payments.filter(
		(payment) =>
			payment.courseTitle?.toLowerCase().includes(searchText.toLowerCase()) ||
			payment.className?.toLowerCase().includes(searchText.toLowerCase()) ||
			payment.teacherName?.toLowerCase().includes(searchText.toLowerCase()),
	);

	const columns = [
		{
			title: 'STT',
			key: 'index',
			align: 'center' as const,
			render: (_: unknown, __: unknown, index: number) => index + 1,
		},
		{
			title: 'Khóa học',
			dataIndex: 'courseTitle',
			key: 'courseTitle',
			align: 'center' as const,
		},
		{
			title: 'Lớp học',
			dataIndex: 'className',
			key: 'className',
			align: 'center' as const,
		},
		{
			title: 'Giáo viên',
			dataIndex: 'teacherName',
			key: 'teacherName',
			align: 'center' as const,
		},
		{
			title: 'Thao tác',
			key: 'actions',
			align: 'center' as const,
			render: (_: unknown, record: PaymentWithDetails) => (
				<Button
					style={{ backgroundColor: '#4096ff', color: 'white' }}
					icon={<EyeOutlined />}
					onClick={() => handleViewDetails(record._id)}
				>
					Chi tiết
				</Button>
			),
		},
	];

	return (
		<div>
			<Row>
				<Col span={2}>
					<ButtonGoBack />
				</Col>
				<Col span={20}>
					<div style={{ textAlign: 'center', marginBottom: 20 }}>
						<h2>Lịch sử thanh toán</h2>
					</div>
				</Col>
			</Row>

			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					marginBottom: '20px',
				}}
			>
				<div>
					<Button
						type="default"
						icon={<SyncOutlined />}
						onClick={handleRefresh}
						style={{ marginRight: 8 }}
					>
						Làm mới
					</Button>
				</div>
				<div>
					<Input
						placeholder="Tìm kiếm"
						onChange={handleSearch}
						style={{ width: 200 }}
						prefix={<SearchOutlined />}
					/>
				</div>
			</div>

			{loading && <Spin size="large" />}
			{error && (
				<Alert message="Lỗi" description={error} type="error" showIcon />
			)}
			{!loading && !error && (
				<div style={{ overflow: 'auto', marginBottom: '60px' }}>
					<Table
						columns={columns}
						dataSource={filteredPayments.length ? filteredPayments : []}
						rowKey="_id"
						locale={{
							emptyText: (
								<Empty
									description="Không có lịch sử thanh toán khớp với bạn tìm kiếm"
									imageStyle={{ height: 60 }}
								/>
							),
						}}
						pagination={{ pageSize: 10 }}
						rowClassName={(_, index) =>
							index % 2 === 0 ? 'table-row-even' : 'table-row-odd'
						}
						scroll={{ x: true }}
						style={{
							backgroundColor: '#fff',
							borderRadius: '10px',
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default PaymentHistory;
