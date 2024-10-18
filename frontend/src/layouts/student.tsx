import { Col, FloatButton, Layout, Row } from 'antd';
import React from 'react';

import Footer from '@/components/commons/Footer';
import Header from '@/components/commons/Header';
import DropdownCenter from '@/components/student/DropdownCenter';
import DropdownProfile from '@/components/student/DropdownProfile';
import LoginButton from '@/components/student/LoginButton';
import { Center } from '@/schemas/center.schema';

const { Content } = Layout;

interface StudentLayoutProps {
	children: React.ReactNode;
	onSelectCenter?: (center: Center | null) => void;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({
	children,
	onSelectCenter,
}) => {
	const handleSelectCenter = (center: Center | null) => {
		if (onSelectCenter) {
			onSelectCenter(center);
		}
	};

	const token = localStorage.getItem('token');
	const rightComponent = token ? <DropdownProfile /> : <LoginButton />;

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Header
				leftComponent={<DropdownCenter onSelectCenter={handleSelectCenter} />}
				rightComponent={rightComponent}
			/>
			<Content style={{ margin: '24px 16px 0' }}>
				<Row justify="center">
					<Col xs={24} sm={24} md={20} lg={20} xl={20}>
						<div
							className="site-layout-background"
							style={{ padding: 24, minHeight: 360 }}
						>
							{children}
						</div>
					</Col>
				</Row>
			</Content>
			<Footer />
			<FloatButton.BackTop />
		</Layout>
	);
};

export default StudentLayout;
