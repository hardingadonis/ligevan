import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import React from 'react';

export type MenuItem = Required<MenuProps>['items'][number];

interface SidebarProps {
	selectedKey: string;
	items: MenuItem[];
	handleMenuClick: (key: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
	selectedKey,
	items,
	handleMenuClick,
}) => {
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

export default Sidebar;
