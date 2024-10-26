import { EnvironmentOutlined } from '@ant-design/icons';
import { Select, Typography } from 'antd';
import React from 'react';

import { Center } from '@/schemas/center.schema';

interface DropdownCenterProps {
	centers: Center[];
	selectedCenter: string;
	onChange: (value: string) => void;
}

const DropdownCenter: React.FC<DropdownCenterProps> = ({
	centers,
	selectedCenter,
	onChange,
}) => (
	<div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
		<Typography.Text style={{ fontWeight: 'bold', marginRight: '8px' }}>
			Tại:
		</Typography.Text>
		<Select
			style={{ width: 200, marginRight: '20px' }}
			placeholder="Select a center"
			onChange={onChange}
			defaultValue={selectedCenter}
		>
			<Select.Option key="all" value="all">
				Tất cả các trung tâm
			</Select.Option>
			{centers.map((center) => (
				<Select.Option
					key={center._id}
					value={center._id}
					label={
						<>
							<EnvironmentOutlined style={{ marginRight: 8 }} />
							{center.name}
						</>
					}
				>
					<EnvironmentOutlined style={{ marginRight: 8 }} />
					{center.name}
				</Select.Option>
			))}
		</Select>
	</div>
);

export default DropdownCenter;
