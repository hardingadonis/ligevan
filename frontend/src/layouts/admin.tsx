import { Layout } from 'antd';
import React, { ReactNode } from 'react';

import Sidebar from '@/components/admin/Sidebar';
import Footer from '@/components/commons/Footer';
import Header from '@/components/commons/Header';

const { Content } = Layout;

interface AdminLayoutProps {
	children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => (
	<Layout style={{ minHeight: '100vh' }}>
		<Header />
		<Layout hasSider>
			<Sidebar />
			<Content
				style={{
					marginLeft: 0,
					padding: 24,
					minHeight: 280,
					background: '#fff',
				}}
			>
				{children}
			</Content>
		</Layout>
		<Footer />
	</Layout>
);

export default AdminLayout;
