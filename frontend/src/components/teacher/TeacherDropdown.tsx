import { Avatar, Dropdown, Menu, Typography } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearInfo } from '@/slices/teacher';

interface TeacherDropdownProps {
	avatarUrl: string;
	userFullName: string;
}

const TeacherDropdown: React.FC<TeacherDropdownProps> = ({
	avatarUrl,
	userFullName,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(clearInfo());
		navigate('/student');
	};

	const menu = (
		<Menu>
			<Menu.Item key="profile" onClick={() => navigate('/teacher/profile')}>
				Hồ sơ
			</Menu.Item>
			<Menu.Item
				key="change-password"
				onClick={() => navigate('/teacher/change-password')}
			>
				Đổi mật khẩu
			</Menu.Item>
			<Menu.Item key="logout" onClick={handleLogout}>
				Đăng xuất
			</Menu.Item>
		</Menu>
	);

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<Dropdown overlay={menu} trigger={['hover']}>
				<div
					style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
				>
					<Typography.Text style={{ marginRight: 8, color: 'white' }}>
						{userFullName}
					</Typography.Text>
					<Avatar src={avatarUrl} style={{ cursor: 'pointer' }} />
				</div>
			</Dropdown>
		</div>
	);
};

export default TeacherDropdown;
