/* eslint-disable react-hooks/exhaustive-deps */
import { EyeOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { Alert, Button, Empty, Input, Select, Spin, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import React, { useEffect, useState } from 'react';

import { getSalaryById } from '@/services/api/salary';
import { findSlotsInRange } from '@/services/api/slot';
import { getTeacherByEmail } from '@/services/api/teacher';
import { formatPrice } from '@/utils/formatPrice';

const { Option } = Select;

interface DataType {
	key: string;
	start: string;
	end: string;
	finalSalary: string;
	slots: number;
}

interface ListSalariesProps {
	email: string;
}

const ListSalaries: React.FC<ListSalariesProps> = ({ email }) => {
	const [data, setData] = useState<DataType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [searchText, setSearchText] = useState<string>('');
	const [selectedYear, setSelectedYear] = useState<string | undefined>(
		undefined,
	);
	const [selectedMonth, setSelectedMonth] = useState<string | undefined>(
		undefined,
	);

	const fetchSalariesForTeacher = async () => {
		setLoading(true);
		try {
			const teacher = await getTeacherByEmail(email);
			const teacherSalaries = teacher.salaries || [];

			const tableData = await Promise.all(
				teacherSalaries.map(async (salary, index) => {
					const detailedSalary = await getSalaryById(salary.toString());
					const slots = await findSlotsInRange(
						(teacher.classes ?? []).toString(),
						new Date(detailedSalary.start),
						new Date(detailedSalary.end),
					);
					return {
						key: (index + 1).toString(),
						start: new Date(detailedSalary.start).toLocaleDateString(),
						end: new Date(detailedSalary.end).toLocaleDateString(),
						finalSalary: formatPrice(detailedSalary.finalSalary),
						slots: slots.length,
					};
				}),
			);

			setData(tableData);
		} catch {
			setError('Không thể tải danh sách lương');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchSalariesForTeacher();
	}, [email]);

	const handleRefresh = () => {
		fetchSalariesForTeacher();
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	const handleYearChange = (value: string) => {
		setSelectedYear(value);
		setSelectedMonth(undefined);
	};

	const handleMonthChange = (value: string) => {
		setSelectedMonth(value);
	};

	const handleViewAll = () => {
		setSelectedYear(undefined);
		setSelectedMonth(undefined);
		setSearchText('');
	};

	const filteredData = data.filter((item) => {
		const startDate = new Date(item.start);
		const matchesYear = selectedYear
			? startDate.getFullYear().toString() === selectedYear
			: true;
		const matchesMonth = selectedMonth
			? (startDate.getMonth() + 1).toString() === selectedMonth
			: true;
		const matchesSearchText =
			item.start.toLowerCase().includes(searchText.toLowerCase()) ||
			item.end.toLowerCase().includes(searchText.toLowerCase()) ||
			item.finalSalary.toLowerCase().includes(searchText.toLowerCase());
		return matchesYear && matchesMonth && matchesSearchText;
	});

	const columns: TableColumnsType<DataType> = [
		{
			title: <div style={{ textAlign: 'center' }}>STT</div>,
			dataIndex: 'key',
			width: '5%',
			align: 'center',
			sorter: (a, b) => parseInt(a.key) - parseInt(b.key),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Bắt đầu</div>,
			dataIndex: 'start',
			width: '20%',
			align: 'center',
			sorter: (a, b) =>
				new Date(a.start).getTime() - new Date(b.start).getTime(),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Kết thúc</div>,
			dataIndex: 'end',
			width: '20%',
			align: 'center',
			sorter: (a, b) => new Date(a.end).getTime() - new Date(b.end).getTime(),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Số tiết học đã dạy</div>,
			dataIndex: 'slots',
			width: '25%',
			align: 'center',
			sorter: (a, b) => a.slots - b.slots,
		},
		{
			title: <div style={{ textAlign: 'center' }}>Tổng lương</div>,
			dataIndex: 'finalSalary',
			width: '30%',
			align: 'right',
			sorter: (a, b) => parseInt(a.finalSalary) - parseInt(b.finalSalary),
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

	const currentYear = new Date().getFullYear();
	const yearOptions = [];
	for (let year = 2020; year <= currentYear; year++) {
		yearOptions.push(
			<Option key={year} value={year.toString()}>
				{year}
			</Option>,
		);
	}

	return (
		<div style={{ paddingLeft: '270px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<h2>Danh sách lương</h2>
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
						icon={<EyeOutlined />}
						onClick={handleViewAll}
						style={{
							backgroundColor: '#4096ff',
							color: 'white',
							marginRight: 8,
						}}
					>
						Xem tất cả
					</Button>
					<Select
						placeholder="Chọn năm"
						onChange={handleYearChange}
						style={{ width: 120, marginRight: 8 }}
						value={selectedYear}
					>
						{yearOptions}
					</Select>
					<Select
						placeholder="Chọn tháng"
						onChange={handleMonthChange}
						style={{ width: 120 }}
						disabled={!selectedYear}
						value={selectedMonth}
					>
						<Option value="1">Tháng 1</Option>
						<Option value="2">Tháng 2</Option>
						<Option value="3">Tháng 3</Option>
						<Option value="4">Tháng 4</Option>
						<Option value="5">Tháng 5</Option>
						<Option value="6">Tháng 6</Option>
						<Option value="7">Tháng 7</Option>
						<Option value="8">Tháng 8</Option>
						<Option value="9">Tháng 9</Option>
						<Option value="10">Tháng 10</Option>
						<Option value="11">Tháng 11</Option>
						<Option value="12">Tháng 12</Option>
					</Select>
				</div>
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

			{loading && <Spin size="large" />}
			{error && (
				<Alert message="Lỗi" description={error} type="error" showIcon />
			)}
			{!loading && !error && (
				<div style={{ overflow: 'auto', marginBottom: '60px' }}>
					<Table<DataType>
						columns={columns}
						dataSource={filteredData.length ? filteredData : []}
						onChange={onChange}
						locale={{
							emptyText: (
								<Empty
									description="Không có lương khớp với bạn tìm kiếm"
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
			)}
		</div>
	);
};

export default ListSalaries;
