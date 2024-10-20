import { HistoryOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Sidebar, { MenuItem } from '@/components/commons/Sidebar';

const StudentSidebar: React.FC = () => {
	const navigate = useNavigate();
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

	const handleMenuClick = (key: string) => {
		switch (key) {
			case 'profile':
				navigate('/student/profile');
				break;
			case 'classList':
				navigate('/student/classes');
				break;
			case 'paymentHistory':
				navigate('/student/payment-history');
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

	return (
		<Sidebar
			selectedKey={selectedKey}
			items={items}
			handleMenuClick={handleMenuClick}
		/>
	);
};

export default StudentSidebar;
