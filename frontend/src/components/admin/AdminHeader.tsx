import Header from '../commons/Header';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderAdmin: React.FC = () => {
	const navigate = useNavigate();
	const fullName = localStorage.getItem('adminFullName');
	const accessToken = localStorage.getItem('accessToken');

	const handleLogout = () => {
		localStorage.clear();
		message.success('Đăng xuất thành công');
		navigate('/admin/login');
	};

	const menu = (
		<Menu>
			<Menu.Item key="logout" onClick={handleLogout}>
				Đăng xuất
			</Menu.Item>
		</Menu>
	);

	const rightComponent = accessToken ? (
		<>
			<span style={{ color: 'white', paddingRight: '15px' }}>{fullName}</span>
			<Dropdown overlay={menu} trigger={['click']}>
				<div>
					<Avatar
						style={{ marginRight: '8px', backgroundColor: 'white' }}
						size="large"
						icon={<UserOutlined style={{ color: 'black' }} />}
					/>
					<DownOutlined style={{ color: 'white' }} />
				</div>
			</Dropdown>
		</>
	) : null;

	return <Header rightComponent={rightComponent} />;
};

export default HeaderAdmin;
