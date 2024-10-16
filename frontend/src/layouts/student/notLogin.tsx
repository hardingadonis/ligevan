import React from 'react';
import { Layout, Button, Space, Row, Col, Grid, FloatButton } from 'antd';
import HeaderStudentPage from '@/components/student/Header';
import DropdownCenter from '@/components/student/DropdownCenter';
import Footer from '@/components/commons/Footer';
import { Center } from '@/schemas/center.schema';

const { Content } = Layout;
const { useBreakpoint } = Grid;

interface StudentLayoutProps {
  children: React.ReactNode;
  onSelectCenter?: (center: Center | null) => void;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children, onSelectCenter }) => {
  const screens = useBreakpoint();
	const handleSelectCenter = (center: Center | null) => {
		if (onSelectCenter) {
			onSelectCenter(center);
		}
	};

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderStudentPage
        leftComponent={<DropdownCenter onSelectCenter={handleSelectCenter} />}
        rightComponent={
          <Space direction={screens.xs ? 'vertical' : 'horizontal'}>
            <Button type="primary">Đăng ký</Button>
            <Button>Đăng nhập</Button>
          </Space>
        }
      />
      <Content style={{ margin: '24px 16px 0' }}>
        <Row justify="center">
          <Col xs={24} sm={24} md={20} lg={20} xl={20}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {children}
            </div>
          </Col>
        </Row>
      </Content>
      <Footer />
			<FloatButton.BackTop />
    </Layout>
  );
};

export default StudentLayout;
