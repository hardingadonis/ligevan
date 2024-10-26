import {
	DeleteOutlined,
	EyeOutlined,
	PlusOutlined,
	SearchOutlined,
	SyncOutlined,
} from '@ant-design/icons';
import { Button, Empty, Input, Table, notification } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AdminLayout from '@/layouts/admin';
import { Voucher } from '@/schemas/voucher.schema';
import { getCenterById, getVouchersByCenterId } from '@/services/api/center';

interface DataType {
	key: string;
	code: string;
	title: string;
	value: number;
	actions: JSX.Element;
}

const ListVouchersCenter: React.FC = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const [vouchers, setVouchers] = useState<DataType[]>([]);
	const [centerName, setCenterName] = useState('');
	const [searchText, setSearchText] = useState('');

	// Fetch vouchers and center data by center ID
	const fetchVouchers = async () => {
		try {
			if (!id) {
				console.error('No ID provided');
				return;
			}
			const center = await getCenterById(id);
			setCenterName(center.name);
			const vouchersData: Voucher[] = await getVouchersByCenterId(id);
			const tableData = vouchersData.map((voucher, index) => ({
				key: (index + 1).toString(),
				code: voucher.code,
				title: voucher.title,
				value: voucher.value || 0,
				actions: renderActions(voucher._id),
			}));
			setVouchers(tableData);
		} catch (error) {
			console.error('Error fetching vouchers:', error);
			notification.error({
				message: 'Lỗi',
				description: 'Đã xảy ra lỗi khi lấy danh sách voucher.',
			});
		}
	};

	useEffect(() => {
		fetchVouchers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Handle search input change
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	// Handle refresh button click
	const handleRefresh = () => {
		fetchVouchers();
	};

	// Filter vouchers based on search text
	const filteredVouchers = vouchers.filter(
		(item) =>
			item.code.toLowerCase().includes(searchText.toLowerCase()) ||
			item.title.toLowerCase().includes(searchText.toLowerCase()) ||
			item.value.toString().includes(searchText.toLowerCase()),
	);

	const handleCreateNewVoucher = () => {
		if (id) {
			navigate(`create`);
		}
	};

	// Define columns for the table
	const columns: TableColumnsType<DataType> = [
		{
			title: <div style={{ textAlign: 'center' }}>STT</div>,
			dataIndex: 'key',
			width: '5%',
			align: 'center',
		},
		{
			title: <div style={{ textAlign: 'center' }}>Mã voucher</div>,
			dataIndex: 'code',
			width: '15%',
		},
		{
			title: <div style={{ textAlign: 'center' }}>Tên voucher</div>,
			dataIndex: 'title',
			width: '25%',
		},
		{
			title: <div style={{ textAlign: 'center' }}>Giá trị</div>,
			dataIndex: 'value',
			width: '15%',
			align: 'center',
			render: (value) => `${value.toLocaleString()}%`,
		},
		{
			title: <div style={{ textAlign: 'center' }}>Thao tác</div>,
			dataIndex: 'actions',
			width: '20%',
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

	// Render action buttons for each row
	const renderActions = (voucherId: string): JSX.Element => (
		<>
			<Button
				color="primary"
				variant="outlined"
				icon={<EyeOutlined />}
				onClick={() => handleDetail(voucherId)}
				style={{ marginRight: 8 }}
			>
				Chi tiết
			</Button>
			<Button
				color="danger"
				variant="outlined"
				icon={<DeleteOutlined />}
				onClick={() => handleDelete(voucherId)}
			>
				Xóa
			</Button>
		</>
	);

	const handleDetail = (voucherId: string) => {
		navigate(`/admin/vouchers/${voucherId}`);
	};

	// Handle delete voucher with notification
	const handleDelete = async (id: string) => {
		navigate(`admin/vouchers/${id}`); //id của voucher
	};

	return (
		<AdminLayout>
			<div style={{ padding: '65px 20px 0 270px' }}>
				<div style={{ textAlign: 'center', marginBottom: 20 }}>
					<h2>Danh sách voucher tại {centerName}</h2>
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
						onClick={handleCreateNewVoucher}
					>
						Thêm voucher mới
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
						dataSource={filteredVouchers.length ? filteredVouchers : []}
						onChange={onChange}
						locale={{
							emptyText: (
								<Empty
									description="Không có voucher để hiển thị"
									imageStyle={{ height: 60 }}
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
		</AdminLayout>
	);
};

export default ListVouchersCenter;
