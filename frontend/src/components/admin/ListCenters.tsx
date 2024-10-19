import {
	DeleteOutlined,
	EditOutlined,
	PlusOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import React, { useEffect, useState } from 'react';

import '@/assets/styles/ListCenters.css';
import { Center } from '@/schemas/center.schema';
import { getAllCenter } from '@/services/api/center';

const { Search } = Input;

interface DataType {
	key: string;
	name: string;
	address: string;
	phone: string;
	thaotac: JSX.Element;
}

const ListCenters: React.FC = () => {
	const [data, setData] = useState<DataType[]>([]);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const centers: Center[] = await getAllCenter();
				const tableData = centers.map((center, index) => ({
					key: (index + 1).toString(),
					name: center.name,
					address: center.address,
					phone: center.phone,
					thaotac: renderActions(center._id),
				}));
				setData(tableData);
			} catch (error) {
				console.error('Lỗi khi lấy danh sách trung tâm:', error);
			}
		};

		fetchData();
	}, []);

	const renderActions = (id: string): JSX.Element => (
		<>
			<Button
				type="primary"
				icon={<EditOutlined />}
				onClick={() => handleEdit(id)}
				style={{ marginRight: 8 }}
			>
				Chỉnh sửa
			</Button>
			<Button
				type="primary"
				danger
				icon={<DeleteOutlined />}
				onClick={() => handleDelete(id)}
				style={{ backgroundColor: 'red', borderColor: 'red' }}
			>
				Xóa
			</Button>
		</>
	);

	const handleEdit = (id: string) => {
		console.log(`Chỉnh sửa trung tâm có id: ${id}`);
	};

	const handleDelete = (id: string) => {
		console.log(`Xóa trung tâm có id: ${id}`);
	};

	const handleCreateNewCenter = () => {
		console.log('Tạo trung tâm mới');
	};

	const handleSearch = (value: string) => {
		setSearchText(value);
	};

	const filteredData = data.filter((item) =>
		item.name.toLowerCase().includes(searchText.toLowerCase()),
	);

	const columns: TableColumnsType<DataType> = [
		{
			title: <div style={{ textAlign: 'center' }}>STT</div>,
			dataIndex: 'key',
			width: '5%',
			sorter: (a, b) => parseInt(a.key) - parseInt(b.key),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Tên</div>,
			dataIndex: 'name',
			width: '15%',
			sorter: (a, b) => a.name.localeCompare(b.name),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Địa chỉ</div>,
			dataIndex: 'address',
			width: '37%',
			sorter: (a, b) => a.address.localeCompare(b.address),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Số điện thoại</div>,
			dataIndex: 'phone',
			width: '19%',
			sorter: (a, b) => a.phone.localeCompare(b.phone),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Thao tác</div>,
			dataIndex: 'thaotac',
			width: '24%',
		},
	];

	const onChange: TableProps<DataType>['onChange'] = (
		pagination,
		filters,
		sorter,
		extra,
	) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	return (
		<div style={{ padding: '65px 20px 0 270px', minHeight: '100vh' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<h2>Tất cả các trung tâm</h2>
			</div>

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: '20px',
				}}
			>
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={handleCreateNewCenter}
				>
					Tạo trung tâm mới
				</Button>
				<Search
					placeholder="Tìm kiếm"
					onSearch={handleSearch}
					style={{ width: 200 }}
					enterButton={<SearchOutlined />}
				/>
			</div>

			<div style={{ overflow: 'auto', marginBottom: '60px' }}>
				<Table<DataType>
					columns={columns}
					dataSource={filteredData}
					onChange={onChange}
					pagination={{ pageSize: 10 }}
					rowClassName={(record, index) =>
						index % 2 === 0 ? 'table-row-even' : 'table-row-odd'
					}
					scroll={{ x: true }}
					style={{
						backgroundColor: '#fff',
						borderRadius: '10px',
					}}
				/>
			</div>
		</div>
	);
};

export default ListCenters;