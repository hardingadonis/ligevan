import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Avatar } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Đăng xuất',
  },
];

const HeaderAdmin: React.FC = () => (
  <div style={{ backgroundColor: '#4269f5', padding: '15px 16px' }}>
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Dropdown menu={{ items }}>
        <button
          onClick={(e) => e.preventDefault()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
            }
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Space>
            <span style={{ color: 'black' }}>ADMIN</span>
            <Avatar icon={<UserOutlined />} style={{ backgroundColor: 'white', color: 'black' }} />
          </Space>
        </button>
      </Dropdown>
    </div>
  </div>
);

export default HeaderAdmin;
