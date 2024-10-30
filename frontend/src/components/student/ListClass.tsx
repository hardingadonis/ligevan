import ButtonGoBack from '../commons/ButtonGoback';
import { EyeOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Empty, Input, Row, Spin, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getClassById } from '@/services/api/class';
import { fetchStudentData } from '@/services/custom/getStudentbyToken';

interface DataType {
	key: string;
	name: string;
	course: string;
	teacher: string;
	slots: number;
	actions: JSX.Element;
}

const ListClass: React.FC = () => {
	const navigate = useNavigate();
	const [data, setData] = useState<DataType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [searchText, setSearchText] = useState<string>('');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalClasses, setTotalClasses] = useState<number>(0);

	const handleViewDetails = useCallback(
		(id: string) => {
			navigate(`/student/classes/${id}`);
		},
		[navigate],
	);

	const renderActions = useCallback(
		(id: string): JSX.Element => (
			<Button
				icon={<EyeOutlined />}
				onClick={() => handleViewDetails(id)}
				style={{ backgroundColor: '#4096ff', color: 'white' }}
			>
				Chi tiết
			</Button>
		),
		[handleViewDetails],
	);

	const fetchClassesForStudent = useCallback(
		async (page: number) => {
			setLoading(true);
			try {
				const studentData = await fetchStudentData();
				const studentClasses = studentData.classes || [];
				setTotalClasses(studentClasses.length);

				const startIndex = (page - 1) * 10;
				const endIndex = startIndex + 10;
				const paginatedClasses = studentClasses.slice(startIndex, endIndex);

				const classRequests = paginatedClasses.map((cls) =>
					getClassById(cls._id),
				);

				const fullClasses = await Promise.all(classRequests);

				const tableData = fullClasses.map((cls, index) => ({
					key: (startIndex + index + 1).toString(),
					name: cls.name,
					course: cls.course.title,
					teacher: cls.teacher.fullName,
					slots: cls.slots?.length ?? 0,
					actions: renderActions(cls._id),
				}));

				setData(tableData);
			} catch {
				setError('Không thể tải danh sách lớp học');
			} finally {
				setLoading(false);
			}
		},
		[renderActions],
	);

	useEffect(() => {
		fetchClassesForStudent(currentPage);
	}, [currentPage, renderActions, fetchClassesForStudent]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	const handleRefresh = () => {
		fetchClassesForStudent(currentPage);
	};

	const filteredData = data.filter(
		(item) =>
			item.name.toLowerCase().includes(searchText.toLowerCase()) ||
			item.teacher.toLowerCase().includes(searchText.toLowerCase()) ||
			item.slots.toString().includes(searchText) ||
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
			width: '20%',
			sorter: (a, b) => a.name.localeCompare(b.name),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Khóa học</div>,
			dataIndex: 'course',
			width: '25%',
			sorter: (a, b) => a.course.localeCompare(b.course),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Giáo viên</div>,
			dataIndex: 'teacher',
			width: '20%',
			sorter: (a, b) => a.teacher.localeCompare(b.teacher),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Số tiết học</div>,
			dataIndex: 'slots',
			width: '15%',
			sorter: (a, b) => a.slots - b.slots,
			align: 'center',
		},
		{
			title: <div style={{ textAlign: 'center' }}>Thao tác</div>,
			dataIndex: 'actions',
			width: '15%',
			align: 'center',
		},
	];

	const onChange: TableProps<DataType>['onChange'] = (pagination) => {
		setCurrentPage(pagination.current || 1);
	};

	return (
		<div>
			<Row>
				<Col span={2}>
					<ButtonGoBack />
				</Col>
				<Col span={20}>
					<div style={{ textAlign: 'center', marginBottom: 20 }}>
						<h2>Danh sách lớp học đã đăng ký</h2>
					</div>
				</Col>
			</Row>

			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					marginBottom: '20px',
				}}
			>
				<div>
					<Button
						type="default"
						icon={<SyncOutlined />}
						onClick={handleRefresh}
						style={{ marginRight: 8 }}
					>
						Làm mới
					</Button>
				</div>
				<div>
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
						pagination={{ pageSize: 10, total: totalClasses }}
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
