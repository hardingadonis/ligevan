import { CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar, { MenuItem } from '@/components/commons/SIdebar';

const TeacherSidebar: React.FC<{ defaultSelectedKey?: string }> = ({
	defaultSelectedKey = 'dashboard',
}) => {
	const navigate = useNavigate();

	const handleMenuClick = (key: string) => {
		switch (key) {
			case 'classes':
				navigate('/teacher/classes');
				break;
			case 'slots':
				navigate('/teacher/slots');
				break;
			default:
				break;
		}
	};

	const getItem = (
		label: React.ReactNode,
		key: React.Key,
		icon?: React.ReactNode,
	): MenuItem => {
		return {
			key,
			icon,
			label,
		} as MenuItem;
	};

	const items: MenuItem[] = [
		getItem(
			'Lớp học',
			'classes',
			<TeamOutlined style={{ fontSize: '18px' }} />,
		),
		getItem(
			'Tiết học',
			'slots',
			<CalendarOutlined style={{ fontSize: '18px' }} />,
		),
	];

	return (
		<Sidebar
			defaultSelectedKey={defaultSelectedKey}
			items={items}
			handleMenuClick={handleMenuClick}
		/>
	);
};

export default TeacherSidebar;
