import { Affix, Avatar, Dropdown, Layout, Menu, Typography } from 'antd';
import { Color } from 'antd/es/color-picker';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearInfo } from '@/slices/teacher';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface HeaderProps {
	leftComponent?: React.ReactNode;
	rightComponent?: React.ReactNode;
	avatarUrl?: string; // Thêm prop cho avatar
	userFullName?: string;
}

const Header: React.FC<HeaderProps> = ({
	leftComponent,
	rightComponent,
	avatarUrl,
	userFullName,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(clearInfo());
		navigate('./');
	};

	const menu = (
		<Menu>
			<Menu.Item key="logout" onClick={handleLogout}>
				Đăng Xuất
			</Menu.Item>
		</Menu>
	);

	return (
		<Affix offsetTop={0}>
			<AntHeader
				className="site-layout-background"
				style={{
					padding: 0,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						flex: 1,
						display: 'flex',
						justifyContent: 'flex-start',
						paddingLeft: '16px',
					}}
				>
					{leftComponent}
				</div>
				<div style={{ flex: 1, textAlign: 'center' }}>
					<Title
						level={3}
						style={{ margin: 0, fontFamily: 'cursive', color: 'white' }}
					>
						ligevan
					</Title>
				</div>
				<div
					style={{
						flex: 1,
						display: 'flex',
						justifyContent: 'flex-end',
						paddingRight: '16px',
					}}
				>
					<Title level={4} style={{ color: 'white', paddingRight: '5px' }}>
						{userFullName}
					</Title>
					<Dropdown overlay={menu} trigger={['click']}>
						<Avatar src={avatarUrl} style={{ cursor: 'pointer' }} />
					</Dropdown>
				</div>
			</AntHeader>
		</Affix>
	);
};

export default Header;
