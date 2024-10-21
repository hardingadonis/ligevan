import {
	BankOutlined,
	BookOutlined,
	DashboardOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Sidebar, { MenuItem, getItem } from '@/components/commons/Sidebar';

const AdminSidebar: React.FC = () => {
	const location = useLocation();
	const [selectedKey, setSelectedKey] = useState('dashboard');

	const routeToKeyMap = {
		'/admin/dashboard': 'dashboard',
		'/admin/centers': 'centers',
		'/admin/courses': 'courses',
	};

	useEffect(() => {
		const activeKey =
			Object.keys(routeToKeyMap).find((key) =>
				location.pathname.startsWith(key),
			) ?? 'dashboard';
		setSelectedKey(routeToKeyMap[activeKey as keyof typeof routeToKeyMap]);
	}, [location.pathname]);

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

	const menuConfig = {
		dashboard: '/admin/dashboard',
		centers: '/admin/centers',
		courses: '/admin/courses',
	};

	return (
		<Sidebar selectedKey={selectedKey} items={items} menuConfig={menuConfig} />
	);
};

export default AdminSidebar;
