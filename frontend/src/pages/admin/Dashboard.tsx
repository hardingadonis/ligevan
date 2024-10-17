import { Column } from '@ant-design/plots';
import { Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';

import '@/assets/styles/global.css';
import AdminLayout from '@/layouts/admin';
import { Center } from '@/schemas/center.schema';
import { Course } from '@/schemas/course.schema';
import { getAllCenter } from '@/services/api/center';
import { getAllCourse } from '@/services/api/course';

const Dashboard: React.FC = () => {
	const [totalCenters, setTotalCenters] = useState<number>(0);
	const [totalCourses, setTotalCourses] = useState<number>(0);

	useEffect(() => {
		const fetchData = async () => {
			const centers: Center[] = await getAllCenter();
			const courses: Course[] = await getAllCourse();
			setTotalCenters(centers.length);
			setTotalCourses(courses.length);
		};
		fetchData();
	}, []);

	const data = [
		{ type: 'Centers', value: totalCenters },
		{ type: 'Courses', value: totalCourses },
	];

	const config = {
		data,
		xField: 'type',
		yField: 'value',
		label: {
			position: 'middle',
			style: {
				fill: '#FFFFFF',
				opacity: 0.6,
			},
		},
		color: ['#1890ff', '#faad14'],
		columnWidthRatio: 0.3,
	};

	return (
		<AdminLayout>
			<Row gutter={[16, 16]} justify="center">
				<Col span={6}>
					<Card title="Total Centers" bordered>
						{totalCenters}
					</Card>
				</Col>
				<Col span={6}>
					<Card title="Total Courses" bordered>
						{totalCourses}
					</Card>
				</Col>
			</Row>
			<Row gutter={[16, 16]} justify="center" style={{ marginTop: 16 }}>
				<Col span={12}>
					<Card title="Statistics" bordered>
						<Column {...config} />
					</Card>
				</Col>
			</Row>
		</AdminLayout>
	);
};

export default Dashboard;
