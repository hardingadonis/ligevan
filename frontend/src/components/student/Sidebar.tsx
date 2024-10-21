import { HistoryOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Sidebar, { MenuItem, getItem } from '@/components/commons/SIdesbar';

const StudentSidebar: React.FC = () => {
	const location = useLocation();
	const [selectedKey, setSelectedKey] = useState('profile');

	useEffect(() => {
		if (location.pathname.includes('/student/profile')) {
			setSelectedKey('profile');
		} else if (location.pathname.includes('/student/classes')) {
			setSelectedKey('classList');
		} else if (location.pathname.includes('/student/payment-history')) {
			setSelectedKey('paymentHistory');
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
			'Lịch sử thanh toán',
			'paymentHistory',
			<HistoryOutlined style={{ fontSize: '18px' }} />,
		),
	];

	const menuConfig = {
		profile: '/student/profile',
		classList: '/student/classes',
		paymentHistory: '/student/payment-history',
	};

	return (
		<Sidebar selectedKey={selectedKey} items={items} menuConfig={menuConfig} />
	);
};

export default StudentSidebar;
