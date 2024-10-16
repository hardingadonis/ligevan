import React, { useState } from 'react';
import { Layout, Typography, Affix, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import '@/assets/styles/header.css';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface HeaderProps {
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
}

const HeaderStudentPage: React.FC<HeaderProps> = ({ leftComponent, rightComponent }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  return (
    <Affix offsetTop={0}>
      <AntHeader className="site-layout-background header">
        <div className="header-left">
          {leftComponent}
        </div>
        <div className="header-center">
          <Title level={3} className="header-title">ligevan</Title>
        </div>
        <div className="header-right">
          {rightComponent}
        </div>
        <Button
          type="primary"
          icon={<MenuOutlined />}
          onClick={showDrawer}
          className="menu-button"
        />
        <Drawer
          title="Menu"
          placement="right"
          onClose={closeDrawer}
          visible={visible}
        >
          <div className="drawer-content">
            <div className="drawer-left">
              {leftComponent}
            </div>
            <div className="drawer-right">
              {rightComponent}
            </div>
          </div>
        </Drawer>
      </AntHeader>
    </Affix>
  );
};

export default HeaderStudentPage;
