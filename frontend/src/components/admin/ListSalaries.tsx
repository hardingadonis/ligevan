import {
	DeleteOutlined,
	PlusOutlined,
	SearchOutlined,
	SyncOutlined,
} from '@ant-design/icons';
import { Button, Empty, Input, Modal, Select, Table, message } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Salary } from '@/schemas/salary.schema';
import { getAllCenter, getCenterById } from '@/services/api/center';
import { deleteSalary, getAllSalary } from '@/services/api/salary';
import { formatDateToVietnamTimezone } from '@/utils/dateFormat';
import { formatPrice } from '@/utils/formatPrice';

interface DataType {
	key: string;
	teacher: string;
	start: string;
	end: string;
	finalSalary: string;
	actions: JSX.Element;
	center: string;
}

const ListSalaries: React.FC = () => {
	const [data, setData] = useState<DataType[]>([]);
	const [searchText, setSearchText] = useState('');
	const [selectedCenter, setSelectedCenter] = useState<string | undefined>(
		undefined,
	);
	const [centers, setCenters] = useState<{ _id: string; name: string }[]>([]);
	const navigate = useNavigate();

	const fetchData = async () => {
		try {
			const salaries: Salary[] = await getAllSalary();
			const tableData = await Promise.all(
				salaries.map(async (salary, index) => {
					const center = await getCenterById(salary.teacher.center.toString());
					return {
						key: (index + 1).toString(),
						teacher: salary.teacher.fullName,
						start: formatDateToVietnamTimezone(salary.start),
						end: formatDateToVietnamTimezone(salary.end),
						finalSalary: formatPrice(salary.finalSalary),
						actions: renderActions(salary._id),
						center: center.name,
					};
				}),
			);
			setData(tableData);
		} catch (error) {
			console.error('Error fetching salaries:', error);
		}
	};

	const fetchCenters = async () => {
		try {
			const centers = await getAllCenter();
			setCenters(centers);
		} catch (error) {
			console.error('Error fetching centers:', error);
		}
	};

	useEffect(() => {
		fetchData();
		fetchCenters();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderActions = (id: string): JSX.Element => (
		<div>
			<Button
				style={{ backgroundColor: '#ff2121', color: 'white' }}
				icon={<DeleteOutlined />}
				onClick={() => handleDelete(id)}
			>
				Xóa
			</Button>
		</div>
	);

	const handleDelete = async (id: string) => {
		Modal.confirm({
			title: 'Xác nhận xóa',
			content: 'Bạn có chắc chắn muốn xóa thông tin về lương này?',
			okText: 'Xóa',
			cancelText: 'Hủy',
			centered: true,
			onOk: async () => {
				try {
					await deleteSalary(id);
					message.success('Thông tin về lương đã xóa thành công!', 3);
					await fetchData(); // Refresh the list after deletion
				} catch (error) {
					console.error('Lỗi xóa thông tin về lương', error);
					message.error('Lỗi: Lỗi xóa thông tin về lương!', 3);
				}
			},
		});
	};

	const handleCreateSalary = () => {
		navigate(`/admin/salaries/calculate`);
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	const handleRefresh = () => {
		fetchData();
	};

	const handleCenterChange = (value: string) => {
		setSelectedCenter(value === 'Tất cả trung tâm' ? undefined : value);
	};

	const filteredData = data.filter(
		(item) =>
			(item.key.toLowerCase().includes(searchText.toLowerCase()) ||
				item.teacher.toLowerCase().includes(searchText.toLowerCase()) ||
				item.finalSalary.toString().includes(searchText)) &&
			(!selectedCenter || item.center === selectedCenter),
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
			title: <div style={{ textAlign: 'center' }}>Tên giáo viên</div>,
			dataIndex: 'teacher',
			width: '20%',
			sorter: (a, b) => a.teacher.localeCompare(b.teacher),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Ngày bắt đầu</div>,
			dataIndex: 'start',
			width: '20%',
			align: 'center',
			sorter: (a, b) =>
				new Date(a.start).getTime() - new Date(b.start).getTime(),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Ngày kết thúc</div>,
			dataIndex: 'end',
			width: '20%',
			align: 'center',
			sorter: (a, b) => new Date(a.end).getTime() - new Date(b.end).getTime(),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Tổng lương</div>,
			dataIndex: 'finalSalary',
			width: '15%',
			align: 'right',
			sorter: (a, b) =>
				parseFloat(a.finalSalary.replace(/[^0-9.-]+/g, '')) -
				parseFloat(b.finalSalary.replace(/[^0-9.-]+/g, '')),
			render: (value) => `${value}`,
		},
		{
			title: 'Thao tác',
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
		console.log({ pagination, filters, sorter, extra });
	};

	return (
		<div style={{ paddingLeft: '270px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<h2>Danh sách lương của giáo viên</h2>
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
						onClick={handleCreateSalary}
					>
						Tính lương
					</Button>
				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Select
						style={{ width: 200, marginRight: 8 }}
						onChange={handleCenterChange}
						allowClear
						defaultValue="Tất cả trung tâm"
					>
						<Select.Option value="Tất cả trung tâm">
							Tất cả trung tâm
						</Select.Option>
						{centers.map((center) => (
							<Select.Option key={center._id} value={center.name}>
								{center.name}
							</Select.Option>
						))}
					</Select>
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
					dataSource={filteredData}
					onChange={onChange}
					locale={{
						emptyText: (
							<Empty
								description={
									searchText
										? 'Không có thông tin lương nào khớp với tìm kiếm của bạn'
										: 'Chưa tính lương cho giáo viên của trung tâm này!'
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

export default ListSalaries;
