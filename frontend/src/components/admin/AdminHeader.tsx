import Header from '../commons/Header';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Typography, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderAdmin: React.FC = () => {
	const navigate = useNavigate();
	const fullName = localStorage.getItem('adminFullName');
	const accessToken = localStorage.getItem('accessToken');

	const handleChangePassword = () => {
		navigate('/admin/change-password');
	};

	const handleLogout = () => {
		localStorage.clear();
		message.success('Đăng xuất thành công');
		navigate('/student');
	};

	const menu = (
		<Menu>
			<Menu.Item key="changePassword" onClick={handleChangePassword}>
				Đổi mật khẩu
			</Menu.Item>
			<Menu.Item key="logout" onClick={handleLogout}>
				Đăng xuất
			</Menu.Item>
		</Menu>
	);

	const rightComponent = accessToken ? (
		<div>
			<Dropdown overlay={menu} trigger={['hover']}>
				<div
					style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
				>
					<Typography.Text style={{ marginRight: 8, color: 'white' }}>
						{fullName}
					</Typography.Text>
					<Avatar
						style={{
							marginRight: '8px',
							backgroundColor: 'white',
							cursor: 'pointer',
						}}
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
