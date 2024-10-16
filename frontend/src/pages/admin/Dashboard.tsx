import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Statistic, Row, Col, Typography } from 'antd';
import { DashboardOutlined, BankOutlined, BookOutlined } from '@ant-design/icons';
import { Column } from '@ant-design/plots';
import axios from 'axios';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface Center {
  id: number;
  name: string;
}

interface Course {
  id: number;
  title: string;
}

const AdminDashboard: React.FC = () => {
  const [centersData, setCentersData] = useState<Center[]>([]);
  const [coursesData, setCoursesData] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const centersResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/centers`);
        const coursesResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/courses`);

        const centersData: Center[] = centersResponse.data;
        const coursesData: Course[] = coursesResponse.data;

        setCentersData(centersData);
        setCoursesData(coursesData);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchData();
  }, []);

  const totalCenters = centersData.length;
  const totalCourses = coursesData.length;

  const chartData = [
    { type: 'Trung tâm', count: totalCenters },
    { type: 'Khóa học', count: totalCourses },
  ];

  const config = {
    data: chartData,
    xField: 'type',
    yField: 'count',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: { alias: 'Loại' },
      count: { alias: 'Số lượng' },
    },
    color: ({ type }: { type: string }) => {
      if (type === 'Trung tâm') {
        return '#3f8600';
      }
      return '#cf1322';
    },
    columnWidthRatio: 0.01,
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light">
        <div className="logo" style={{ display: 'none' }} />
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Bảng điều khiển
          </Menu.Item>
          <Menu.Item key="2" icon={<BankOutlined />}>
            Trung tâm
          </Menu.Item>
          <Menu.Item key="3" icon={<BookOutlined />}>
            Khóa học
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, paddingLeft: '16px' }}>
          <Title level={3} style={{ color: '#1890ff', fontSize: '24px', margin: 0 }}>
            Bảng điều khiển
          </Title>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Tổng số Trung tâm"
                  value={totalCenters}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Tổng số Khóa học"
                  value={totalCourses}
                  valueStyle={{ color: '#cf1322' }}
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: '24px' }}>
            <Col span={24}>
              <Card title="Số lượng Trung tâm và Khóa học">
                <Column {...config} />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
