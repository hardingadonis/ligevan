import { EyeOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import {
	Alert,
	Button,
	Col,
	Empty,
	Input,
	Row,
	Spin,
	Table,
	Typography,
} from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Class } from '@/schemas/class.schema';
import { Student } from '@/schemas/student.schema';
import { apiBaseUrl } from '@/utils/apiBase';
import { formatDateToVietnamTimezone } from '@/utils/dateFormat';

interface DataType {
	key: string;
	fullName: string;
	phone: string;
	gender: string;
	dob: string;
	actions: JSX.Element;
}

interface ListStudentProps {
	classID: string;
}

const ListStudent: React.FC<ListStudentProps> = ({ classID }) => {
	const navigate = useNavigate();
	const [data, setData] = useState<DataType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [searchText, setSearchText] = useState<string>('');
	const [className, setClassName] = useState<string>(''); // Tên lớp
	const [studentsCount, setStudentsCount] = useState<number>(0); // Số học sinh
	const [slotsCount, setSlotsCount] = useState<number>(0); // Số tiết học

	const fetchListStudent = async () => {
		setLoading(true);
		try {
			const classResponse = await axios.get<Class>(
				`${apiBaseUrl}/api/classes/${classID}`,
			);
			const classes = classResponse.data;
			setClassName(classes.name);
			setStudentsCount(classes.students?.length ?? 0);
			setSlotsCount(classes.slots?.length ?? 0);

			const classStudent = classes.students || [];
			const studentRequests = classStudent.map((std) =>
				axios.get<Student>(`${apiBaseUrl}/api/students/${std._id}`),
			);

			const studentResponses = await Promise.all(studentRequests);
			const fullStudents = studentResponses.map((response) => response.data);

			const tableData = fullStudents.map((std_id, index) => ({
				key: (index + 1).toString(),
				fullName: std_id.fullName,
				phone: std_id.phone,
				gender: std_id.gender === 'male' ? 'Nam' : 'Nữ',
				dob: formatDateToVietnamTimezone(std_id.dob),
				actions: renderActions(std_id._id),
			}));

			setData(tableData);
		} catch {
			setError('Không thể tải danh sách học sinh');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchListStudent();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [classID]);

	const renderActions = (id: string): JSX.Element => (
		<Button
			style={{
				backgroundColor: '#4096ff',
				color: 'white',
			}}
			icon={<EyeOutlined />}
			onClick={() => handleDetail(id)}
		>
			Chi tiết
		</Button>
	);

	const handleDetail = (id: string) => {
		navigate(`/teacher/classes/student/${id}`);
	};

	const handleRefresh = () => {
		fetchListStudent();
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	const filteredData = data.filter(
		(item) =>
			item.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
			item.phone.toLowerCase().includes(searchText.toLowerCase()) ||
			item.gender.toLowerCase().includes(searchText.toLowerCase()) ||
			item.dob.toLowerCase().includes(searchText.toLowerCase()),
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
			title: <div style={{ textAlign: 'center' }}>Họ và tên</div>,
			dataIndex: 'fullName',
			width: '25%',
			sorter: (a, b) => a.fullName.localeCompare(b.fullName),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Số điện thoại</div>,
			dataIndex: 'phone',
			width: '20%',
			align: 'center',
			sorter: (a, b) => parseInt(a.phone) - parseInt(b.phone),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Giới tính</div>,
			dataIndex: 'gender',
			width: '15%',
			align: 'center',
			sorter: (a, b) => a.gender.localeCompare(b.gender),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Ngày sinh</div>,
			dataIndex: 'dob',
			width: '25%',
			align: 'center',
			sorter: (a, b) => a.dob.localeCompare(b.dob),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Thao tác</div>,
			dataIndex: 'actions',
			width: '10%',
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
				<div style={{ textAlign: 'left' }}>
					<ButtonGoBack />
				</div>
				<h2>Chi tiết lớp {className.toUpperCase()}</h2>
			</div>

			<Row
				justify="space-between"
				align="middle"
				style={{ marginBottom: '20px' }}
			>
				<Col>
					<Typography.Text>
						TÊN LỚP: <strong>{className}</strong>
						<br />
						SỐ HỌC SINH: <strong>{studentsCount}</strong>
						<br />
						SỐ TIẾT HỌC: <strong>{slotsCount}</strong>
					</Typography.Text>
				</Col>
				<Col>
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
				</Col>
			</Row>

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
									description="Không có học sinh khớp với bạn tìm kiếm"
									imageStyle={{ height: 60 }}
								/>
							),
						}}
						pagination={{ pageSize: 10 }}
						rowClassName={(_, index) =>
							index % 2 === 0 ? 'table-row-even' : 'table-row-odd'
						}
						scroll={{ x: true }}
						style={{ backgroundColor: '#fff', borderRadius: '10px' }}
					/>
				</div>
			)}
		</div>
	);
};

export default ListStudent;
