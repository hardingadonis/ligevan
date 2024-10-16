import React from 'react';
import { Menu } from 'antd';
import { DashboardOutlined, BankOutlined, BookOutlined } from '@ant-design/icons'; 

interface SidebarProps {
  defaultSelectedKey?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ defaultSelectedKey = 'dashboard' }) => (
  <Menu
    mode="vertical"
    defaultSelectedKeys={[defaultSelectedKey]}
    style={{
      width: 250, 
      height: '100vh', 
      borderRight: '1px solid #e0e0e0',
      backgroundColor: '#f0f0f0', 
      color: '#000', 
      fontSize: '16px', 
      fontWeight: 500, 
    }}
  >
    <Menu.Item key="dashboard" icon={<DashboardOutlined style={{ fontSize: '18px' }} />}>
      Dashboard
    </Menu.Item>
    <Menu.Item key="centers" icon={<BankOutlined style={{ fontSize: '18px' }} />}>
      Centers
    </Menu.Item>
    <Menu.Item key="courses" icon={<BookOutlined style={{ fontSize: '18px' }} />}>
      Courses
    </Menu.Item>
  </Menu>
);

export default Sidebar;
