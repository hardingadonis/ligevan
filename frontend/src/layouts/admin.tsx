import { Layout } from 'antd';
import React, { ReactNode } from 'react';

import Sidebar from '@/components/admin/Sidebar';
import Footer from '@/components/commons/Footer';
import Header from '@/components/commons/Header';

const { Content } = Layout;

interface AdminLayoutProps {
    children: ReactNode;
    showSidebar?: boolean;  // Optional prop to control the display of the Sidebar
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, showSidebar = true }) => (
    <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Layout hasSider={showSidebar}>
            {showSidebar && <Sidebar />}
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
        <Footer />
    </Layout>
);

export default AdminLayout;
