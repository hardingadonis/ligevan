import {
	EyeOutlined,
	PlusOutlined,
	SearchOutlined,
	SyncOutlined,
} from '@ant-design/icons';
import { Alert, Button, Empty, Input, Spin, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { TableProps } from 'antd/lib';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Center } from '@/schemas/center.schema';
import { Teacher } from '@/schemas/teacher.schema';
import { apiBaseUrl } from '@/utils/apiBase';

interface DataType {
	key: string;
	fullName: string;
	phone: string;
	address: string;
	actions: JSX.Element;
}

const ListTeacherOfCenter: React.FC = () => {
	const { centerID } = useParams<{ centerID: string }>();
	const navigate = useNavigate();
	const [data, setData] = useState<DataType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [searchText, setSearchText] = useState<string>('');

	const fetchTeacher = async () => {
		setLoading(true);
		try {
			const centerResponse = await axios.get<Center>(
				apiBaseUrl + `/api/centers/${centerID}`,
			);
			const center = centerResponse.data;
			const teacherList = center.teachers || [];

			const teacherRequests = teacherList.map((tch) =>
				axios.get<Teacher>(apiBaseUrl + `/api/teachers/${tch._id}`),
			);

			const teacherResponses = await Promise.all(teacherRequests);
			const fullTeachers = teacherResponses.map((response) => response.data);

			console.log(JSON.stringify(fullTeachers, null, 2));

			const tableData = fullTeachers.map((tch, index) => ({
				key: (index + 1).toString(),
				fullName: tch.fullName,
				phone: tch.phone,
				address: tch.address,
				actions: renderActions(tch._id),
			}));

			setData(tableData);
		} catch {
			setError('Không thể tải danh sách giáo viên');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTeacher();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderActions = (id: string): JSX.Element => (
		<div>
			<Button
				icon={<EyeOutlined />}
				onClick={() => handleDetail(id)}
				style={{ marginRight: 8, backgroundColor: '#4096ff', color: 'white' }}
			>
				Chi tiết
			</Button>
		</div>
	);

	const handleDetail = (id: string) => {
		navigate(`/admin/centers/teachers/${id}`);
	};

	const handleRefresh = () => {
		fetchTeacher();
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	const handleCreateNewTeacher = () => {
		navigate(`/admin/centers/${centerID}/teachers/create`);
	};

	const filteredData = data.filter(
		(item) =>
			item.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
			item.phone.toLowerCase().includes(searchText.toLowerCase()) ||
			item.address.toLowerCase().includes(searchText.toLowerCase()),
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
			title: <div style={{ textAlign: 'center' }}>Họ và Tên</div>,
			dataIndex: 'fullName',
			width: '20%',
			sorter: (a, b) => a.fullName.localeCompare(b.fullName),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Số điện thoại</div>,
			dataIndex: 'phone',
			width: '15%',
			align: 'center',
			sorter: (a, b) => a.phone.localeCompare(b.phone),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Địa chỉ</div>,
			dataIndex: 'address',
			width: '25%',
			sorter: (a, b) => parseInt(a.address) - parseInt(b.address),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Thao tác</div>,
			dataIndex: 'actions',
			align: 'center',
			width: '10%',
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
				<div style={{ textAlign: 'left' }}>
					<ButtonGoBack />
				</div>
				<h2>Danh sách giáo viên</h2>
			</div>

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: '20px',
				}}
			>
				<Button
					style={{ marginRight: 8, backgroundColor: '#0cd14e', color: 'white' }}
					icon={<PlusOutlined />}
					onClick={handleCreateNewTeacher}
				>
					Tạo giáo viên mới
				</Button>
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
									description="Không có giáo viên khớp với bạn tìm kiếm"
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
			)}
		</div>
	);
};

export default ListTeacherOfCenter;
