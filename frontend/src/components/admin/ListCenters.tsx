import {
	DeleteOutlined,
	EyeOutlined,
	PlusOutlined,
	SearchOutlined,
	SyncOutlined,
} from '@ant-design/icons';
import { Button, Empty, Input, Modal, Table, notification } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Center } from '@/schemas/center.schema';
import { deleteCenter, getAllCenter } from '@/services/api/center';

interface DataType {
	key: string;
	name: string;
	address: string;
	phone: string;
	actions: JSX.Element;
}

const ListCenters: React.FC = () => {
	const navigate = useNavigate();
	const [data, setData] = useState<DataType[]>([]);
	const [searchText, setSearchText] = useState('');

	const fetchData = async () => {
		try {
			const centers: Center[] = await getAllCenter();
			centers.sort(
				(a, b) =>
					new Date(b.createdAt ?? 0).getTime() -
					new Date(a.createdAt ?? 0).getTime(),
			);
			const tableData = centers.map((center, index) => ({
				key: (index + 1).toString(),
				name: center.name,
				address: center.address,
				phone: center.phone,
				actions: renderActions(center._id),
			}));
			setData(tableData);
		} catch (error) {
			console.error('Lỗi khi lấy danh sách trung tâm:', error);
		}
	};

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderActions = (id: string): JSX.Element => (
		<>
			<Button
				style={{ backgroundColor: '#4096ff', color: 'white', marginRight: 8 }}
				icon={<EyeOutlined />}
				onClick={() => handleDetail(id)}
			>
				Chi tiết
			</Button>
			<Button
				style={{ backgroundColor: '#ff2121', color: 'white' }}
				icon={<DeleteOutlined />}
				onClick={() => handleDelete(id)}
			>
				Xóa
			</Button>
		</>
	);

	const handleDetail = (id: string) => {
		navigate(`/admin/centers/${id}`);
	};

	const handleDelete = async (id: string) => {
		Modal.confirm({
			title: 'Xác nhận xóa',
			content: 'Bạn có chắc chắn muốn xóa trung tâm này?',
			okText: 'Xóa',
			cancelText: 'Hủy',
			centered: true,
			onOk: async () => {
				try {
					await deleteCenter(id);
					notification.success({
						message: 'Xóa thành công',
						description: 'Trung tâm đã được xóa thành công.',
						duration: 3,
					});
					fetchData();
				} catch (error) {
					console.error('Lỗi khi xóa trung tâm:', error);
					notification.error({
						message: 'Lỗi',
						description: 'Đã xảy ra lỗi khi xóa trung tâm.',
						duration: 3,
					});
				}
			},
		});
	};

	const handleCreateNewCenter = () => {
		navigate('/admin/centers/create');
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	const handleRefresh = () => {
		fetchData();
	};

	const filteredData = data.filter(
		(item) =>
			item.name.toLowerCase().includes(searchText.toLowerCase()) ||
			item.address.toLowerCase().includes(searchText.toLowerCase()) ||
			item.phone.toLowerCase().includes(searchText.toLowerCase()),
	);

	const columns: TableColumnsType<DataType> = [
		{
			title: <div style={{ textAlign: 'center' }}>STT</div>,
			dataIndex: 'key',
			width: '5%',
			align: 'center',
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
			align: 'center',
			sorter: (a, b) => a.phone.localeCompare(b.phone),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Thao tác</div>,
			dataIndex: 'actions',
			width: '24%',
			align: 'center',
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
		<div style={{ paddingLeft: '270px' }}>
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
					style={{ backgroundColor: '#0cd14e', color: 'white' }}
					icon={<PlusOutlined />}
					onClick={handleCreateNewCenter}
				>
					Tạo trung tâm mới
				</Button>
				<div>
					<Button
						type="default"
						icon={<SyncOutlined />}
						onClick={handleRefresh}
						style={{ marginRight: 8 }}
					>
						Làm mới
					</Button>
					<Input
						placeholder="Tìm kiếm"
						onChange={handleSearch}
						style={{ width: 200 }}
						prefix={<SearchOutlined />}
					/>
				</div>
			</div>

			<div style={{ overflow: 'auto', marginBottom: '60px' }}>
				<Table<DataType>
					columns={columns}
					dataSource={filteredData.length ? filteredData : []}
					onChange={onChange}
					locale={{
						emptyText: (
							<Empty
								description="Không có trung tâm khớp với bạn tìm kiếm"
								imageStyle={{ height: 60 }}
							/>
						),
					}}
					pagination={{ pageSize: 7 }}
					rowClassName={(_, index) =>
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
