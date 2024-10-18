import { DownOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import { Center } from '@/schemas/center.schema';
import { getAllCenter } from '@/services/api/center';

interface DropdownCenterProps {
	onSelectCenter: (center: Center | null) => void;
}

const DropdownCenter: React.FC<DropdownCenterProps> = ({ onSelectCenter }) => {
	const [centers, setCenters] = useState<Center[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedCenter, setSelectedCenter] = useState<string>('');

	useEffect(() => {
		const fetchCenters = async () => {
			try {
				const data = await getAllCenter();
				setCenters(data);
				if (data.length > 0) {
					setSelectedCenter(data[0].name);
					onSelectCenter(data[0]);
				}
			} catch {
				setError('Lỗi truy xuất dữ liệu các Trung tâm');
			} finally {
				setLoading(false);
			}
		};

		fetchCenters();
	}, []);

	const handleMenuClick = (e: { key: string }) => {
		const selected = centers.find((center) => center._id === e.key);
		if (selected) {
			setSelectedCenter(selected.name);
			onSelectCenter(selected);
		}
	};

	const items = centers.map((center) => ({
		label: center.name,
		key: center._id,
		icon: <EnvironmentOutlined />,
	}));

	const menuProps = {
		items,
		onClick: handleMenuClick,
	};

	if (loading) {
		return (
			<div style={{ display: 'inline-flex', alignItems: 'center' }}>
				<Spin />
				<span style={{ marginLeft: 8, color: 'white' }}>Đang tải...</span>
			</div>
		);
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<Space wrap className="dropdown-center">
			<Dropdown menu={menuProps}>
				<Button>
					<Space>
						{selectedCenter}
						<DownOutlined />
					</Space>
				</Button>
			</Dropdown>
		</Space>
	);
};

export default DropdownCenter;
