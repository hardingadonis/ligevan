import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BankOutlined, BookOutlined, DashboardOutlined } from '@ant-design/icons';
import Sidebar, { MenuItem } from '@/components/commons/Sidebar'; 

const AdminSidebar: React.FC<{ defaultSelectedKey?: string }> = ({ defaultSelectedKey = 'dashboard' }) => {
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    switch (key) {
      case 'dashboard':
        navigate('/admin/dashboard');
        break;
      case 'centers':
        navigate('/admin/centers');
        break;
      case 'courses':
        navigate('/admin/courses');
        break;
      default:
        break;
    }
  };

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
  ): MenuItem => {
    return {
      key,
      icon,
      label,
    } as MenuItem;
  };

  const items: MenuItem[] = [
    getItem('Bảng Điều Khiển', 'dashboard', <DashboardOutlined style={{ fontSize: '18px' }} />),
    getItem('Trung Tâm', 'centers', <BankOutlined style={{ fontSize: '18px' }} />),
    getItem('Khóa Học', 'courses', <BookOutlined style={{ fontSize: '18px' }} />),
  ];

  return (
    <Sidebar
      defaultSelectedKey={defaultSelectedKey}
      items={items}
      handleMenuClick={handleMenuClick}
    />
  );
};

export default AdminSidebar;
