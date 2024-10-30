import { EyeOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { Alert, Button, Empty, Input, Spin, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Class } from '@/schemas/class.schema';
import { Teacher } from '@/schemas/teacher.schema';
import { apiBaseUrl } from '@/utils/apiBase';

interface DataType {
	key: string;
	name: string;
	students: string;
	slots: string;
	course: string;
	actions: JSX.Element;
}

interface ListClassProps {
	email: string;
}

const ListClass: React.FC<ListClassProps> = ({ email }) => {
	const navigate = useNavigate();
	const [data, setData] = useState<DataType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [searchText, setSearchText] = useState<string>('');

	const fetchClassesForTeacher = async () => {
		setLoading(true);
		try {
			const teacherResponse = await axios.get<Teacher>(
				apiBaseUrl + `/api/teachers/email/${email}`,
			);
			const teacher = teacherResponse.data;
			const teacherClasses = teacher.classes || [];

			const classRequests = teacherClasses.map((cls) =>
				axios.get<Class>(apiBaseUrl + `/api/classes/${cls}`),
			);

			const classResponses = await Promise.all(classRequests);
			const fullClasses = classResponses.map((response) => response.data);

			const tableData = fullClasses.map((cls, index) => ({
				key: (index + 1).toString(),
				name: cls.name,
				students: (cls.students?.length ?? 0).toString(),
				slots: (cls.slots?.length ?? 0).toString(),
				course: cls.course.title,
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
		fetchClassesForTeacher();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [email]);

	const renderActions = (id: string): JSX.Element => (
		<Button
			icon={<EyeOutlined />}
			onClick={() => handleDetail(id)}
			style={{
				backgroundColor: '#4096ff',
				color: 'white',
				marginRight: 8,
			}}
		>
			Chi tiết
		</Button>
	);

	const handleDetail = (id: string) => {
		navigate(`/teacher/classes/${id}`);
	};

	const handleRefresh = () => {
		fetchClassesForTeacher();
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	const filteredData = data.filter(
		(item) =>
			item.name.toLowerCase().includes(searchText.toLowerCase()) ||
			item.students.toLowerCase().includes(searchText.toLowerCase()) ||
			item.slots.toLowerCase().includes(searchText.toLowerCase()) ||
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
			title: <div style={{ textAlign: 'center' }}>Tên Lớp</div>,
			dataIndex: 'name',
			width: '25%',
			sorter: (a, b) => a.name.localeCompare(b.name),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Khóa học</div>,
			dataIndex: 'course',
			width: '30%',
			sorter: (a, b) => a.course.localeCompare(b.course),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Học sinh</div>,
			dataIndex: 'students',
			width: '15%',
			align: 'center',
			sorter: (a, b) => parseInt(a.students) - parseInt(b.students),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Tiết học</div>,
			dataIndex: 'slots',
			width: '15%',
			align: 'center',
			sorter: (a, b) => parseInt(a.slots) - parseInt(b.slots),
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
				<h2>Danh sách lớp học</h2>
			</div>

			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					marginBottom: '20px',
				}}
			>
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

export default ListClass;
