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
import { Class } from '@/schemas/class.schema';
import { apiBaseUrl } from '@/utils/apiBase';

interface DataType {
	key: string;
	name: string;
	teacher: string;
	course: string;
	actions: JSX.Element;
}

const ListClassOfCenter: React.FC = () => {
	const { centerID } = useParams<{ centerID: string }>();
	const navigate = useNavigate();
	const [data, setData] = useState<DataType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [searchText, setSearchText] = useState<string>('');

	const fetchClass = async () => {
		setLoading(true);
		try {
			const centerResponse = await axios.get<Center>(
				apiBaseUrl + `/api/centers/${centerID}`,
			);
			const center = centerResponse.data;
			const classList = center.classes || [];

			const classRequests = classList.map((cls) =>
				axios.get<Class>(apiBaseUrl + `/api/classes/${cls._id}`),
			);

			const classResponses = await Promise.all(classRequests);
			const fullClass = classResponses.map((response) => response.data);

			console.log(JSON.stringify(fullClass, null, 2));

			const tableData = fullClass.map((cls, index) => ({
				key: (index + 1).toString(),
				name: cls.name,
				teacher: cls.teacher.fullName,
				course: cls.course.code,
				actions: renderActions(cls._id),
			}));

			setData(tableData);
		} catch {
			setError('Không thể tải danh sách lớp học');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchClass();
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
		navigate(`/admin/centers/classes/${id}`);
	};

	const handleRefresh = () => {
		fetchClass();
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	const handleCreateNewClass = () => {
		navigate(`/admin/centers/${centerID}/classes/create`);
	};

	const filteredData = data.filter(
		(item) =>
			item.name.toLowerCase().includes(searchText.toLowerCase()) ||
			item.teacher.toLowerCase().includes(searchText.toLowerCase()) ||
			item.course.toLowerCase().includes(searchText.toLowerCase()),
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
			title: <div style={{ textAlign: 'center' }}>Tên lớp học</div>,
			dataIndex: 'name',
			width: '25%',
			sorter: (a, b) => a.name.localeCompare(b.name),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Tên giáo viên</div>,
			dataIndex: 'teacher',
			width: '20%',
			sorter: (a, b) => a.teacher.localeCompare(b.teacher),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Khóa học</div>,
			dataIndex: 'course',
			width: '20%',
			sorter: (a, b) => a.course.localeCompare(b.course),
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
				<h2>Danh sách lớp học</h2>
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
					onClick={handleCreateNewClass}
				>
					Tạo lớp học mới
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
									description="Không có lớp học khớp với bạn tìm kiếm"
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

export default ListClassOfCenter;
