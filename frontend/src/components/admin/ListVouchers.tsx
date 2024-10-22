import {
	DeleteOutlined,
	EyeOutlined,
	PlusOutlined,
	SearchOutlined,
	SyncOutlined,
} from '@ant-design/icons';
import { Button, Empty, Input, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import React, { useEffect, useState } from 'react';

import { Voucher } from '@/schemas/voucher.schema';
import { getAllVoucher } from '@/services/api/voucher';
import { formatDateTimeToVietnamTimezone } from '@/utils/dateFormat';

interface DataType {
	key: string;
	code: string;
	title: string;
	value: number;
	start: Date;
	end: Date;
	actions: JSX.Element;
}

const ListVouchers: React.FC = () => {
	const [data, setData] = useState<DataType[]>([]);
	const [searchText, setSearchText] = useState('');

	const fetchData = async () => {
		try {
			const vouchers: Voucher[] = await getAllVoucher();
			console.log('Danh sách mã giảm giá:', vouchers);
			const tableData = vouchers.map((voucher, index) => ({
				key: (index + 1).toString(),
				code: voucher.code,
				title: voucher.title,
				value: voucher.value,
				start: voucher.start,
				end: voucher.end,
				actions: renderActions(voucher._id),
			}));
			setData(tableData);
		} catch (error) {
			console.error('Lỗi khi lấy danh sách mã giảm giá:', error);
		}
	};

	useEffect(() => {
		fetchData();
	});

	const renderActions = (id: string): JSX.Element => (
		<>
			<Button
				color="primary"
				variant="outlined"
				icon={<EyeOutlined />}
				onClick={() => handleViewDetail(id)}
				style={{ marginRight: 8 }}
			>
				Chi tiết
			</Button>
			<Button
				color="danger"
				variant="outlined"
				icon={<DeleteOutlined />}
				onClick={() => handleDelete(id)}
			>
				Xóa
			</Button>
		</>
	);

	const handleViewDetail = (id: string) => {
		console.log(`Chỉnh sửa mã giảm giá có id: ${id}`);
	};

	const handleDelete = (id: string) => {
		console.log(`Xóa mã giảm giá có id: ${id}`);
	};

	const handleCreateNewvoucher = () => {
		console.log('Tạo mã giảm giá mới');
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	const handleRefresh = () => {
		fetchData();
	};

	const filteredData = data.filter(
		(item) =>
			item.key.toLowerCase().includes(searchText.toLowerCase()) ||
			item.code.toLowerCase().includes(searchText.toLowerCase()) ||
			item.title.toLowerCase().includes(searchText.toLowerCase()) ||
			item.value.toString().toLowerCase().includes(searchText.toLowerCase()) ||
			item.start.toString().toLowerCase().includes(searchText.toLowerCase()) ||
			item.end.toString().toLowerCase().includes(searchText.toLowerCase()),
	);

	const columns: TableColumnsType<DataType> = [
		{
			title: <div style={{ textAlign: 'center' }}>STT</div>,
			dataIndex: 'key',
			width: '5%',
			sorter: (a, b) => parseInt(a.key) - parseInt(b.key),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Mã giảm giá</div>,
			dataIndex: 'code',
			width: '15%',
			sorter: (a, b) => a.code.localeCompare(b.code),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Tiêu đề</div>,
			dataIndex: 'title',
			width: '25%',
			sorter: (a, b) => a.title.localeCompare(b.title),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Giá trị</div>,
			dataIndex: 'value',
			width: '10%',
			sorter: (a, b) => a.value - b.value,
			render: (value) => <div style={{ textAlign: 'center' }}>{value}%</div>,
		},
		{
			title: <div style={{ textAlign: 'center' }}>Ngày bắt đầu</div>,
			dataIndex: 'start',
			width: '15%',
			sorter: (a, b) =>
				new Date(a.start).getTime() - new Date(b.start).getTime(),
			render: (date) => (
				<div style={{ textAlign: 'center' }}>
					{formatDateTimeToVietnamTimezone(new Date(date))}
				</div>
			),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Ngày kết thúc</div>,
			dataIndex: 'end',
			width: '15%',
			sorter: (a, b) => new Date(a.end).getTime() - new Date(b.end).getTime(),
			render: (date) => (
				<div style={{ textAlign: 'center' }}>
					{formatDateTimeToVietnamTimezone(new Date(date))}
				</div>
			),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Thao tác</div>,
			dataIndex: 'actions',
			width: '15%',
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
		<div style={{ padding: '65px 20px 0 270px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<h2>Tất cả các mã giảm giá</h2>
			</div>

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: '20px',
				}}
			>
				<div>
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={handleCreateNewvoucher}
					>
						Tạo mã giảm giá mới
					</Button>
				</div>
				<div>
					<Button
						type="default"
						icon={<SyncOutlined />}
						onClick={handleRefresh}
						style={{ marginRight: 8 }}
					>
						{' '}
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
					dataSource={filteredData}
					onChange={onChange}
					locale={{
						emptyText: (
							<Empty
								description={
									searchText
										? 'Không có mã giảm giá nào khớp với tìm kiếm của bạn'
										: 'Không có mã giảm giá nào'
								}
							/>
						),
					}}
					pagination={{ pageSize: 10 }}
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

export default ListVouchers;
