import React from 'react';
import { Layout, Typography, Affix } from 'antd';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface HeaderProps {
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ leftComponent, rightComponent }) => {
  return (
    <Affix offsetTop={0}>
      <AntHeader className="site-layout-background" style={{ padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', paddingLeft: '16px' }}>
          {leftComponent}
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <Title level={3} style={{ margin: 0, fontFamily: 'cursive', color: 'white' }}>ligevan</Title>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingRight: '16px' }}>
          {rightComponent}
        </div>
      </AntHeader>
    </Affix>
  );
};

export default Header;
