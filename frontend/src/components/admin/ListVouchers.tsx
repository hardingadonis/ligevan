import {
	DeleteOutlined,
	EyeOutlined,
	PlusOutlined,
	SearchOutlined,
	SyncOutlined,
} from '@ant-design/icons';
import { Button, Empty, Input, Modal, Table, message } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Voucher } from '@/schemas/voucher.schema';
import { deleteVoucher, getAllVoucher } from '@/services/api/voucher';

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
	const navigate = useNavigate();

	const fetchData = async () => {
		try {
			const vouchers: Voucher[] = await getAllVoucher();
			const sortedVouchers = vouchers.sort((a, b) => {
				const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
				const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
				return dateB - dateA;
			});
			const tableData = sortedVouchers.map((voucher, index) => ({
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderActions = (id: string): JSX.Element => (
		<div>
			<Button
				style={{ backgroundColor: '#4096ff', color: 'white', marginRight: 8 }}
				icon={<EyeOutlined />}
				onClick={() => handleViewDetail(id)}
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
		</div>
	);

	const handleViewDetail = (id: string) => {
		navigate(`/admin/vouchers/${id}`);
	};

	const handleDelete = async (id: string) => {
		Modal.confirm({
			title: 'Xác nhận xóa',
			content: 'Bạn có chắc chắn muốn xóa mã giảm giá này?',
			okText: 'Xóa',
			cancelText: 'Hủy',
			centered: true,
			onOk: async () => {
				try {
					await deleteVoucher(id);
					message.success('Mã giảm giá đã được xóa thành công!', 3);
					navigate(`/admin/vouchers`);
				} catch (error) {
					console.error('Lỗi khi xóa mã giảm giá:', error);
					message.error('Lỗi: Đã xảy ra lỗi khi xóa mã giảm giá!', 3);
				}
			},
		});
	};

	const handleCreateVoucher = () => {
		navigate(`/admin/vouchers/create`);
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
			item.value.toString().includes(searchText),
	);

	const columns: TableColumnsType<DataType> = [
		{
			title: 'STT',
			dataIndex: 'key',
			width: '5%',
			align: 'center',
			sorter: (a, b) => parseInt(a.key) - parseInt(b.key),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Mã giảm giá</div>,
			dataIndex: 'code',
			width: '20%',
			sorter: (a, b) => a.code.localeCompare(b.code),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Tiêu đề</div>,
			dataIndex: 'title',
			width: '35%',
			sorter: (a, b) => a.title.localeCompare(b.title),
		},
		{
			title: 'Giá trị',
			dataIndex: 'value',
			width: '15%',
			align: 'center',
			sorter: (a, b) => a.value - b.value,
			render: (value) => `${value}%`,
		},
		{
			title: 'Thao tác',
			dataIndex: 'actions',
			width: '25%',
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
						style={{ backgroundColor: '#0cd14e', color: 'white' }}
						icon={<PlusOutlined />}
						onClick={handleCreateVoucher}
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

export default ListVouchers;
