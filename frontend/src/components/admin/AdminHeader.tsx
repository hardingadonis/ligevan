import Header from '../commons/Header';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Typography, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;
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
		<div>
			<Dropdown overlay={menu} trigger={['hover']}>
				<div>
					<Text style={{ color: 'white', paddingRight: '15px' }}>
						{fullName}
					</Text>
					<Avatar
						style={{ marginRight: '8px', backgroundColor: 'white' }}
						size="large"
						icon={<UserOutlined style={{ color: 'black' }} />}
					/>
				</div>
			</Dropdown>
		</div>
	) : null;

	return <Header rightComponent={rightComponent} />;
};

export default HeaderAdmin;
