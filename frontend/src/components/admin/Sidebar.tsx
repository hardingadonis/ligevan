import {
	BankOutlined,
	BookOutlined,
	DashboardOutlined,
	TagsOutlined,
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
		'/admin/vouchers': 'vouchers',
	};

	useEffect(() => {
		const activeKey =
			Object.keys(routeToKeyMap).find((key) =>
				location.pathname.startsWith(key),
			) ?? 'dashboard';
		setSelectedKey(routeToKeyMap[activeKey as keyof typeof routeToKeyMap]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		getItem(
			'Mã giảm giá',
			'vouchers',
			<TagsOutlined style={{ fontSize: '18px' }} />,
		),
	];

	const menuConfig = {
		dashboard: '/admin/dashboard',
		centers: '/admin/centers',
		courses: '/admin/courses',
		vouchers: '/admin/vouchers',
	};

	return (
		<Sidebar selectedKey={selectedKey} items={items} menuConfig={menuConfig} />
	);
};

export default AdminSidebar;
