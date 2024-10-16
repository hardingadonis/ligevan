import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer: React.FC = () => {
  return (
    <AntFooter style={{ textAlign: 'center', padding: '20px 50px', boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)' }}>
      <Text>© 2024 Ligevan.</Text>
    </AntFooter>
  );
};

export default Footer;
