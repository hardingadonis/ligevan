import { DownOutlined, UserOutlined } from '@ant-design/icons';
import {
	Affix,
	Avatar,
	Dropdown,
	Layout,
	Menu,
	Typography,
	message,
} from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface HeaderProps {
	leftComponent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ leftComponent }) => {
	const navigate = useNavigate();
	const fullName = localStorage.getItem('adminFullName');
	const accessToken = localStorage.getItem('accessToken');

	const handleLogout = () => {
		localStorage.clear();
		message.success('Logged out successfully');
		navigate('/admin/login');
	};

	const menu = (
		<Menu>
			<Menu.Item key="logout" onClick={handleLogout}>
				Logout
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
						alignItems: 'center',
					}}
				>
					{accessToken && (
						<>
							<span style={{ color: 'white', paddingRight: '15px' }}>
								{fullName}
							</span>
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
					)}
				</div>
			</AntHeader>
		</Affix>
	);
};

export default Header;
