import { Col, FloatButton, Layout, Row } from 'antd';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Footer from '@/components/commons/Footer';
import Header from '@/components/commons/Header';
import ButtonLogin from '@/components/student/ButtonLogin';
import DropdownCenter from '@/components/student/DropdownCenter';
import DropdownProfile from '@/components/student/DropdownProfile';
import { Center } from '@/schemas/center.schema';

const { Content } = Layout;

interface StudentLayoutProps {
	children: React.ReactNode;
	onSelectCenter?: (center: Center | null) => void;
}

const StudentLayoutNoSidebar: React.FC<StudentLayoutProps> = ({
	children,
	onSelectCenter,
}) => {
	const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);
	const location = useLocation();

	const handleSelectCenter = (center: Center | null) => {
		setSelectedCenter(center);
		if (onSelectCenter) {
			onSelectCenter(center);
		}
	};

	const token = localStorage.getItem('token');
	const rightComponent = token ? <DropdownProfile /> : <ButtonLogin />;

	const showDropdownCenter =
		location.pathname === '/student' ||
		location.pathname === '/student/login' ||
		location.pathname === '/student/';

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Header
				leftComponent={
					showDropdownCenter ? (
						<DropdownCenter
							onSelectCenter={handleSelectCenter}
							selectedCenter={selectedCenter}
						/>
					) : null
				}
				rightComponent={rightComponent}
			/>
			<Content style={{ margin: '24px 16px 0' }}>
				<Row justify="center">
					<Col xs={24} sm={24} md={20} lg={20} xl={20}>
						<div style={{ padding: 24, minHeight: 360 }}>{children}</div>
					</Col>
				</Row>
			</Content>
			<Footer />
			<FloatButton.BackTop />
		</Layout>
	);
};

export default StudentLayoutNoSidebar;
