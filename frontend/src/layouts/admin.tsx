import { FloatButton, Layout } from 'antd';
import React, { ReactNode } from 'react';

import AdminHeader from '@/components/admin/AdminHeader';
import Sidebar from '@/components/admin/Sidebar';
import Footer from '@/components/commons/Footer';

const { Content } = Layout;

interface AdminLayoutProps {
	children: ReactNode;
	showSidebar?: boolean;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
	children,
	showSidebar = true,
}) => (
	<Layout style={{ minHeight: '100vh', position: 'relative' }}>
		<AdminHeader />
		<Layout hasSider={showSidebar}>
			{showSidebar && <Sidebar />}
			<Layout>
				<Content
					style={{
						marginLeft: showSidebar ? 0 : undefined,
						padding: 24,
						minHeight: 280,
						background: '#fff',
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout>
		<Footer />
		<FloatButton.BackTop />
	</Layout>
);

export default AdminLayout;
