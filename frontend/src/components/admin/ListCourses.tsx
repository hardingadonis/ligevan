import {
	DeleteOutlined,
	EditOutlined,
	PlusOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import React, { useEffect, useState } from 'react';

import '@/assets/styles/ListCourse.css';
import { Course } from '@/schemas/course.schema';
import { getAllCourse } from '@/services/api/course';

interface DataType {
	key: string;
	code: string;
	title: string;
	price: number;
	actions: JSX.Element;
}

const ListCourses: React.FC = () => {
	const [data, setData] = useState<DataType[]>([]);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const courses: Course[] = await getAllCourse();
				const tableData = courses.map((course, index) => ({
					key: (index + 1).toString(),
					code: course.code,
					title: course.title,
					price: course.price,
					actions: renderActions(course._id),
				}));
				setData(tableData);
			} catch (error) {
				console.error('Lỗi khi lấy danh sách khóa học:', error);
			}
		};

		fetchData();
	}, []);

	const renderActions = (id: string): JSX.Element => (
		<>
			<Button
				type="primary"
				icon={<EditOutlined />}
				onClick={() => handleEdit(id)}
				style={{ marginRight: 8 }}
			>
				Chỉnh sửa
			</Button>
			<Button
				type="primary"
				danger
				icon={<DeleteOutlined />}
				onClick={() => handleDelete(id)}
				style={{ backgroundColor: 'red', borderColor: 'red' }}
			>
				Xóa
			</Button>
		</>
	);

	const handleEdit = (id: string) => {
		console.log(`Chỉnh sửa khóa học có id: ${id}`);
	};

	const handleDelete = (id: string) => {
		console.log(`Xóa khóa học có id: ${id}`);
	};

	const handleCreateNewCourse = () => {
		console.log('Tạo khóa học mới');
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	// Hàm lọc dữ liệu theo nhiều trường
	const filteredData = data.filter(
		(item) =>
			// Kiểm tra xem giá trị trong các trường STT, mã khóa học, tiêu đề, giá có khớp với từ khóa tìm kiếm không
			item.key.toLowerCase().includes(searchText.toLowerCase()) ||
			item.code.toLowerCase().includes(searchText.toLowerCase()) ||
			item.title.toLowerCase().includes(searchText.toLowerCase()) ||
			item.price.toString().toLowerCase().includes(searchText.toLowerCase()),
	);

	const columns: TableColumnsType<DataType> = [
		{
			title: <div style={{ textAlign: 'center' }}>STT</div>,
			dataIndex: 'key',
			width: '5%',
			sorter: (a, b) => parseInt(a.key) - parseInt(b.key),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Mã khóa học</div>,
			dataIndex: 'code',
			width: '15%',
			sorter: (a, b) => a.code.localeCompare(b.code),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Tiêu đề</div>,
			dataIndex: 'title',
			width: '40%',
			sorter: (a, b) => a.title.localeCompare(b.title),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Giá</div>,
			dataIndex: 'price',
			width: '15%',
			sorter: (a, b) => a.price - b.price,
			render: (price) => (
				<div style={{ textAlign: 'right' }}>
					{new Intl.NumberFormat('vi-VN', {
						style: 'currency',
						currency: 'VND',
					}).format(price)}
				</div>
			),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Thao tác</div>,
			dataIndex: 'actions',
			width: '25%',
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
		<div style={{ padding: '65px 20px 0 270px', minHeight: '100vh' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<h2>Tất cả các khóa học</h2>
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
					onClick={handleCreateNewCourse}
				>
					Tạo khóa học mới
				</Button>
				<Input
					placeholder="Tìm kiếm"
					onChange={handleSearch}
					style={{ width: 200 }}
					prefix={<SearchOutlined />}
				/>
			</div>

			<div style={{ overflow: 'auto', marginBottom: '60px' }}>
				<Table<DataType>
					columns={columns}
					dataSource={filteredData}
					onChange={onChange}
					pagination={{ pageSize: 10 }}
					rowClassName={(record, index) =>
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

export default ListCourses;