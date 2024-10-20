import { HistoryOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Col, FloatButton, Layout, Row } from 'antd';
import React from 'react';

import '@/assets/styles/dropdownCenter.css';
import Footer from '@/components/commons/Footer';
import Header from '@/components/commons/Header';
import Sidebar, { MenuItem } from '@/components/commons/Sidebar';
import DropdownProfile from '@/components/student/DropdownProfile';

const { Content, Sider } = Layout;

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
		},
		{
			key: 'classList',
			icon: <TeamOutlined />,
			label: 'Danh sách lớp',
		},
		{
			key: 'paymentHistory',
			icon: <HistoryOutlined />,
			label: 'Lịch sử thanh toán',
		},
	];

	const handleMenuClick = (key: string) => {
		console.log('Menu item clicked:', key);
	};

	return (
		<Layout style={{ minHeight: '100vh', position: 'relative' }}>
			<Header rightComponent={rightComponent} />
			<Layout>
				<Sider width={250}>
					<Sidebar items={menuItems} handleMenuClick={handleMenuClick} />
				</Sider>
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
			<div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
				<Footer />
			</div>
			<FloatButton.BackTop />
		</Layout>
	);
};

export default StudentLayoutWithSidebar;
