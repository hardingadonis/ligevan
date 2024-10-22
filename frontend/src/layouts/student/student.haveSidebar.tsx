import { Col, FloatButton, Layout, Row } from 'antd';
import React from 'react';

import Footer from '@/components/commons/Footer';
import Header from '@/components/commons/Header';
import DropdownProfile from '@/components/student/DropdownProfile';
import StudentSidebar from '@/components/student/Sidebar';

const { Content } = Layout;

interface StudentLayoutProps {
	children: React.ReactNode;
}

const StudentLayoutWithSidebar: React.FC<StudentLayoutProps> = ({
	children,
}) => {
	const rightComponent = <DropdownProfile />;

	return (
		<Layout style={{ minHeight: '100vh', position: 'relative' }}>
			<Header rightComponent={rightComponent} />
			<Layout>
				<StudentSidebar />
				<Layout style={{ paddingLeft: 250 }}>
					<Content style={{ margin: '24px 16px 0' }}>
						<Row justify="center">
							<Col xs={24} sm={24} md={23} lg={23} xl={23}>
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
