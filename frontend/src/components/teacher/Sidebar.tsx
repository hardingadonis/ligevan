import {
	CalendarOutlined,
	TableOutlined,
	TeamOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Sidebar, { MenuItem, getItem } from '@/components/commons/Sidebar';

const StudentSidebar: React.FC = () => {
	const location = useLocation();
	const [selectedKey, setSelectedKey] = useState('profile');

	useEffect(() => {
		if (location.pathname.includes('/teacher/classes')) {
			setSelectedKey('classes');
		} else if (location.pathname.includes('/teacher/schedule')) {
			setSelectedKey('schedule');
		} else if (location.pathname.includes('/teacher/salaries')) {
			setSelectedKey('salaries');
		}
	}, [location.pathname]);

	const items: MenuItem[] = [
		getItem(
			'Danh sách lớp',
			'classes',
			<TeamOutlined style={{ fontSize: '18px' }} />,
		),
		getItem(
			'Lịch dạy',
			'schedule',
			<CalendarOutlined style={{ fontSize: '18px' }} />,
		),
		getItem(
			'Bảng lương',
			'salaries',
			<TableOutlined style={{ fontSize: '18px' }} />,
		),
	];

	const menuConfig = {
		classes: '/teacher/classes',
		schedule: '/teacher/schedule',
		salaries: '/teacher/salaries',
	};

	return (
		<Sidebar selectedKey={selectedKey} items={items} menuConfig={menuConfig} />
	);
};

export default StudentSidebar;
