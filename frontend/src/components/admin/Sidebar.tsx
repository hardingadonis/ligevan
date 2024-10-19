import {
	BankOutlined,
	BookOutlined,
	DashboardOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Sidebar, { MenuItem } from '@/components/commons/Sidebar';

const AdminSidebar: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [selectedKey, setSelectedKey] = useState('dashboard');

	useEffect(() => {
		if (location.pathname.includes('/admin/dashboard')) {
			setSelectedKey('dashboard');
		} else if (location.pathname.includes('/admin/centers')) {
			setSelectedKey('centers');
		} else if (location.pathname.includes('/admin/courses')) {
			setSelectedKey('courses');
		}
	}, [location.pathname]);

	const handleMenuClick = (key: string) => {
		switch (key) {
			case 'dashboard':
				navigate('/admin/dashboard');
				break;
			case 'centers':
				navigate('/admin/centers');
				break;
			case 'courses':
				navigate('/admin/courses');
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
			'Bảng Điều Khiển',
			'dashboard',
			<DashboardOutlined style={{ fontSize: '18px' }} />,
		),
		getItem(
			'Trung Tâm',
			'centers',
			<BankOutlined style={{ fontSize: '18px' }} />,
		),
		getItem(
			'Khóa Học',
			'courses',
			<BookOutlined style={{ fontSize: '18px' }} />,
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

export default AdminSidebar;
