import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/commons/Header';
import Footer from '@/components/commons/Footer';

const { Content } = Layout;

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => (
  <Layout style={{ minHeight: '100vh',  }}>
    <Header/>
    <Layout hasSider>
      <Sidebar />
      <Content style={{ 
        marginLeft: 0, 
        padding: 24,
        minHeight: 280,
        background: '#fff'
      }}>
        {children}
      </Content>
    </Layout>
    <Footer/>
  </Layout>
);

export default AdminLayout;
