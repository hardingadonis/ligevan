import { DownOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import { Center } from '@/schemas/center.schema';
import { getAllCenter } from '@/services/api/center';

interface DropdownCenterProps {
	onSelectCenter: (center: Center | null) => void;
	className?: string;
	selectedCenter?: Center | null;
}

const DropdownCenter: React.FC<DropdownCenterProps> = ({
	onSelectCenter,
	className,
	selectedCenter,
}) => {
	const [centers, setCenters] = useState<Center[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCenters = async () => {
			try {
				const data = await getAllCenter();
				setCenters(data);
				if (data.length > 0 && !selectedCenter) {
					onSelectCenter(data[0]);
				}
			} catch {
				setError('Lỗi truy xuất dữ liệu các Trung tâm');
			} finally {
				setLoading(false);
			}
		};

		fetchCenters();
	}, [selectedCenter, onSelectCenter]);

	const handleMenuClick = (e: { key: string }) => {
		const selected = centers.find((center) => center._id === e.key);
		if (selected) {
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
		return <Typography.Text color="white">{error}</Typography.Text>;
	}

	return (
		<Space wrap className={className}>
			<Dropdown menu={menuProps}>
				<Button>
					<Space>
						{selectedCenter?.name}
						<DownOutlined />
					</Space>
				</Button>
			</Dropdown>
		</Space>
	);
};

export default DropdownCenter;
