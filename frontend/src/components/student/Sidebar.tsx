import {
	HistoryOutlined,
	ScheduleOutlined,
	TeamOutlined,
	UserOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Sidebar, { MenuItem, getItem } from '@/components/commons/Sidebar';

const StudentSidebar: React.FC = () => {
	const location = useLocation();
	const [selectedKey, setSelectedKey] = useState('profile');

	useEffect(() => {
		switch (true) {
			case location.pathname.includes('/student/profile'):
				setSelectedKey('profile');
				break;
			case location.pathname.includes('/student/classes'):
				setSelectedKey('classList');
				break;
			case location.pathname.includes('/student/schedule'):
				setSelectedKey('schedule');
				break;
			case location.pathname.includes('/student/payment-history'):
				setSelectedKey('paymentHistory');
				break;
			default:
				break;
		}
	}, [location.pathname]);

	const items: MenuItem[] = [
		getItem('Hồ sơ', 'profile', <UserOutlined style={{ fontSize: '18px' }} />),
		getItem(
			'Danh sách lớp',
			'classList',
			<TeamOutlined style={{ fontSize: '18px' }} />,
		),
		getItem(
			'Lịch học',
			'schedule',
			<ScheduleOutlined style={{ fontSize: '18px' }} />,
		),
		getItem(
			'Lịch sử thanh toán',
			'paymentHistory',
			<HistoryOutlined style={{ fontSize: '18px' }} />,
		),
	];

	const menuConfig = {
		profile: '/student/profile',
		classList: '/student/classes',
		schedule: '/student/schedule',
		paymentHistory: '/student/payment-history',
	};

	return (
		<Sidebar selectedKey={selectedKey} items={items} menuConfig={menuConfig} />
	);
};

export default StudentSidebar;
