import { EyeOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Spin, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import StudentLayoutWithSidebar from '@/layouts/student/student.haveSidebar';
import { Payment } from '@/schemas/payment.schema';
import { getPaymentByID } from '@/services/api/payment';
import { fetchStudentData } from '@/services/custom/getStudentbyToken';

const { Title } = Typography;

interface PaymentWithDetails extends Payment {
	className?: string;
	teacherName?: string;
	courseTitle?: string;
}

const PaymentHistory: React.FC = () => {
	const [payments, setPayments] = useState<PaymentWithDetails[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchPaymentHistory = async () => {
		try {
			const studentData = await fetchStudentData();
			console.log('Student data:', studentData);

			if (studentData && studentData.payments) {
				const paymentDetailsPromises = studentData.payments.map(
					async (payment) => {
						try {
							const paymentDetail = await getPaymentByID(payment._id);
							return {
								...paymentDetail,
								className: paymentDetail.class.name,
								courseTitle: paymentDetail.class.course.title,
								teacherName: paymentDetail.class.teacher.fullName,
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
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPaymentHistory();
	}, []);

	if (loading) {
		return (
			<div style={{ display: 'inline-flex', alignItems: 'center' }}>
				<Spin />
				<span style={{ marginLeft: 8 }}>Đang tải lịch sử thanh toán...</span>
			</div>
		);
	}

	const columns = [
		{
			title: 'STT',
			key: 'index',
			render: (_: any, __: any, index: number) => index + 1,
		},
		{
			title: 'Khóa học',
			dataIndex: 'courseTitle',
			key: 'courseTitle',
		},
		{
			title: 'Lớp học',
			dataIndex: 'className',
			key: 'className',
		},
		{
			title: 'Giáo viên',
			dataIndex: 'teacherName',
			key: 'teacherName',
		},
		{
			title: 'Thao tác',
			key: 'actions',
			render: (_: any, record: PaymentWithDetails) => (
				<Button
					icon={<EyeOutlined />}
					onClick={() => handleViewDetails(record._id)}
				>
					Chi tiết
				</Button>
			),
		},
	];

	const handleViewDetails = (id: string) => {
		console.log('Viewing details for payment ID:', id);
		// Add navigation to payment details page if needed
	};

	return (
		<StudentLayoutWithSidebar>
			<Title level={2} style={{ textAlign: 'center' }}>
				Lịch sử thanh toán
			</Title>
			<Table dataSource={payments} columns={columns} rowKey="_id" />
		</StudentLayoutWithSidebar>
	);
};

export default PaymentHistory;
