import { CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Sidebar, { MenuItem, getItem } from '@/components/commons/SIdesbar';

const StudentSidebar: React.FC = () => {
	const location = useLocation();
	const [selectedKey, setSelectedKey] = useState('profile');

	useEffect(() => {
		if (location.pathname.includes('/teacher/classes')) {
			setSelectedKey('classes');
		} else if (location.pathname.includes('/teacher/slots')) {
			setSelectedKey('slots');
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
			'slots',
			<CalendarOutlined style={{ fontSize: '18px' }} />,
		),
	];

	const menuConfig = {
		classes: '/teacher/classes',
		slots: '/teacher/slots',
	};

	return (
		<Sidebar selectedKey={selectedKey} items={items} menuConfig={menuConfig} />
	);
};

export default StudentSidebar;
