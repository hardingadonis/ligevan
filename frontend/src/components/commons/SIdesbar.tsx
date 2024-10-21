import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export type MenuItem = Required<MenuProps>['items'][number];

interface SidebarProps {
	selectedKey: string;
	items: MenuItem[];
	menuConfig: { [key: string]: string };
}

const Sidebar: React.FC<SidebarProps> = ({
	selectedKey,
	items,
	menuConfig,
}) => {
	const navigate = useNavigate();

	const handleMenuClick = (key: string) => {
		const path = menuConfig[key];
		if (path) {
			navigate(path);
		}
	};

	return (
		<Menu
			mode="vertical"
			selectedKeys={[selectedKey]}
			onClick={({ key }) => handleMenuClick(key as string)}
			style={{
				width: 250,
				height: '100vh',
				position: 'fixed',
				top: 0,
				left: 0,
				borderRight: '1px solid #e0e0e0',
				backgroundColor: '#f0f0f0',
				color: '#000',
				fontSize: '16px',
				fontWeight: 500,
				marginTop: 65,
			}}
			items={items}
		/>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const getItem = (
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

export default Sidebar;
