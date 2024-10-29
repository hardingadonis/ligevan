import { Column, Pie } from '@ant-design/plots';
import { Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';

import AdminLayout from '@/layouts/admin';
import { Center } from '@/schemas/center.schema';
import { Course } from '@/schemas/course.schema';
import { getAllCenter } from '@/services/api/center';
import { getAllCourse } from '@/services/api/course';
import { getAllStudent } from '@/services/api/student';
import { getAllTeacher } from '@/services/api/teacher';
import { getAllVoucher } from '@/services/api/voucher';

const Dashboard: React.FC = () => {
	const [tongTrungTam, setTongTrungTam] = useState<number>(0);
	const [tongKhoaHoc, setTongKhoaHoc] = useState<number>(0);
	const [tongHocSinh, setTongHocSinh] = useState<number>(0);
	const [tongGiaoVien, setTongGiaoVien] = useState<number>(0);
	const [tongVoucher, setTongVoucher] = useState<number>(0);

	useEffect(() => {
		const fetchData = async () => {
			const centers: Center[] = await getAllCenter();
			const courses: Course[] = await getAllCourse();
			const students = await getAllStudent();
			const teachers = await getAllTeacher();
			const vouchers = await getAllVoucher();

			setTongTrungTam(centers.length);
			setTongKhoaHoc(courses.length);
			setTongHocSinh(students.length);
			setTongGiaoVien(teachers.length);
			setTongVoucher(vouchers.length);
		};
		fetchData();
	}, []);

	const pieData = [
		{ type: 'Trung Tâm', value: tongTrungTam },
		{ type: 'Khóa Học', value: tongKhoaHoc },
		{ type: 'Học Sinh', value: tongHocSinh },
		{ type: 'Giáo Viên', value: tongGiaoVien },
		{ type: 'Voucher', value: tongVoucher },
	];

	const columnData = [
		{ type: 'Trung Tâm', value: tongTrungTam },
		{ type: 'Khóa Học', value: tongKhoaHoc },
	];

	const pieConfig = {
		appendPadding: 10,
		data: pieData,
		angleField: 'value',
		colorField: 'type',
		radius: 0.9,
		autoFit: true,
		interactions: [{ type: 'element-active' }],
		legend: { position: 'bottom' },
		tooltip: false,
	};

	const columnConfig = {
		data: columnData,
		xField: 'type',
		yField: 'value',
		autoFit: true,
		width: 200,
		meta: {
			type: { alias: 'Loại' },
			value: { alias: 'Số Lượng' },
		},
	};

	return (
		<AdminLayout>
			<Row gutter={[16, 16]} justify="center" style={{ paddingLeft: 180 }}>
				<Col span={4}>
					<Card title="Tổng Trung Tâm" bordered>
						{tongTrungTam}
					</Card>
				</Col>
				<Col span={4}>
					<Card title="Tổng Khóa Học" bordered>
						{tongKhoaHoc}
					</Card>
				</Col>
				<Col span={4}>
					<Card title="Tổng Học Sinh" bordered>
						{tongHocSinh}
					</Card>
				</Col>
				<Col span={4}>
					<Card title="Tổng Giáo Viên" bordered>
						{tongGiaoVien}
					</Card>
				</Col>
				<Col span={4}>
					<Card title="Tổng Voucher" bordered>
						{tongVoucher}
					</Card>
				</Col>
			</Row>
			<Row
				gutter={[16, 16]}
				justify="center"
				style={{ marginTop: 16, paddingLeft: 180, marginBottom: 90 }}
			>
				<Col span={12}>
					<Card title="Thống Kê" bordered>
						<div style={{ width: '100%', height: '300px' }}>
							<Pie {...pieConfig} />
						</div>
					</Card>
				</Col>
				<Col span={8}>
					<Card title="Trung Tâm và Khóa Học" bordered>
						<div style={{ width: '100%', height: '300px' }}>
							<Column {...columnConfig} />
						</div>
					</Card>
				</Col>
			</Row>
		</AdminLayout>
	);
};

export default Dashboard;
