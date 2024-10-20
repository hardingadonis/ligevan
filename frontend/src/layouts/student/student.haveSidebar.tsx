import { HistoryOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Col, FloatButton, Layout, Row } from 'antd';
import React from 'react';

import '@/assets/styles/dropdownCenter.css';
import Footer from '@/components/commons/Footer';
import Header from '@/components/commons/Header';
import Sidebar, { MenuItem } from '@/components/commons/Sidebar';
import DropdownProfile from '@/components/student/DropdownProfile';

const { Content } = Layout;

interface StudentLayoutProps {
	children: React.ReactNode;
}

const StudentLayoutWithSidebar: React.FC<StudentLayoutProps> = ({
	children,
}) => {
	const rightComponent = <DropdownProfile />;

	const menuItems: MenuItem[] = [
		{
			key: 'profile',
			icon: <UserOutlined />,
			label: 'Hồ sơ',
			// link: '/student/profile',
		},
		{
			key: 'classList',
			icon: <TeamOutlined />,
			label: 'Danh sách lớp',
			// link: '/student/classes',
		},
		{
			key: 'paymentHistory',
			icon: <HistoryOutlined />,
			label: 'Lịch sử thanh toán',
			// link: '/student/payment-history',
		},
	];

	const handleMenuClick = (key: string) => {
		console.log('Menu item clicked:', key);
	};

	return (
		<Layout style={{ minHeight: '100vh', position: 'relative' }}>
			<Header rightComponent={rightComponent} />
			<Layout>
				<Sidebar items={menuItems} handleMenuClick={handleMenuClick} />
				<Layout style={{ paddingLeft: 250 }}>
					<Content style={{ margin: '24px 16px 0' }}>
						<Row justify="center">
							<Col xs={24} sm={24} md={20} lg={20} xl={20}>
								<div style={{ padding: 24, minHeight: 360 }}>{children}</div>
							</Col>
						</Row>
					</Content>
				</Layout>
			</Layout>
			<Footer />
			<FloatButton.BackTop />
		</Layout>
	);
};

export default StudentLayoutWithSidebar;
