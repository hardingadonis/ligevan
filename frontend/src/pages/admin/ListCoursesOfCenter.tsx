import {
	EyeOutlined,
	PlusOutlined,
	SearchOutlined,
	SyncOutlined,
} from '@ant-design/icons';
import { Button, Empty, Input, Table, notification } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import AdminLayout from '@/layouts/admin';
import { Course } from '@/schemas/course.schema';
import { getCenterById, getCoursesByCenterId } from '@/services/api/center';
import { setCenterID } from '@/slices/center';
import { formatPrice } from '@/utils/formatPrice';

interface DataType {
	key: string;
	code: string;
	title: string;
	description: string;
	price: number;
	actions: JSX.Element;
}

const ListCourseCenter: React.FC = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const [courses, setCourses] = useState<DataType[]>([]);
	const [centerName, setCenterName] = useState('');
	const [searchText, setSearchText] = useState('');
	const dispatch = useDispatch();

	const fetchCourses = async () => {
		try {
			if (!id) {
				console.error('No ID provided');
				return;
			}
			const center = await getCenterById(id);
			setCenterName(center.name);
			const coursesData: Course[] = await getCoursesByCenterId(id);
			const tableData = coursesData.map((course, index) => ({
				key: (index + 1).toString(),
				code: course.code,
				title: course.title,
				description: course.description,
				price: course.price || 0,
				actions: renderActions(course._id),
			}));
			setCourses(tableData);
		} catch (error) {
			console.error('Error fetching courses:', error);
			notification.error({
				message: 'Lỗi',
				description: 'Đã xảy ra lỗi khi lấy danh sách khóa học.',
			});
		}
	};

	useEffect(() => {
		fetchCourses();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	const handleRefresh = () => {
		fetchCourses();
	};

	const filteredCourses = courses.filter(
		(item) =>
			item.code.toLowerCase().includes(searchText.toLowerCase()) ||
			item.title.toLowerCase().includes(searchText.toLowerCase()) ||
			item.description.toLowerCase().includes(searchText.toLowerCase()) ||
			item.price.toString().includes(searchText.toLowerCase()),
	);

	const handleCreateNewCourse = () => {
		if (id) {
			navigate(`create`);
		}
	};

	const columns: TableColumnsType<DataType> = [
		{
			title: <div style={{ textAlign: 'center' }}>STT</div>,
			dataIndex: 'key',
			width: '5%',
			align: 'center',
		},
		{
			title: <div style={{ textAlign: 'center' }}>Mã khóa học</div>,
			dataIndex: 'code',
			width: '15%',
		},
		{
			title: <div style={{ textAlign: 'center' }}>Tên khóa học</div>,
			dataIndex: 'title',
			width: '20%',
		},
		{
			title: <div style={{ textAlign: 'center' }}>Mô tả</div>,
			dataIndex: 'description',
			width: '23%',
		},
		{
			title: <div style={{ textAlign: 'center' }}>Giá</div>,
			dataIndex: 'price',
			width: '15%',
			align: 'right',
			render: (price) => `${formatPrice(price)}`,
		},
		{
			title: <div style={{ textAlign: 'center' }}>Thao tác</div>,
			dataIndex: 'actions',
			width: '12%',
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

	const renderActions = (courseId: string): JSX.Element => (
		<Button
			color="primary"
			variant="outlined"
			icon={<EyeOutlined />}
			onClick={() => handleDetail(courseId)}
			style={{ marginRight: 8, backgroundColor: '#4096ff', color: 'white' }}
		>
			Chi tiết
		</Button>
	);

	const handleDetail = (courseId: string) => {
		if (id) {
			dispatch(setCenterID(id));
			navigate(`/admin/centers/courses/${courseId}`);
		}
	};

	return (
		<AdminLayout>
			<div style={{ paddingLeft: '270px' }}>
				<div style={{ textAlign: 'center', marginBottom: 20 }}>
					<div style={{ textAlign: 'left' }}>
						<ButtonGoBack />
					</div>
					<h2>Danh sách khóa học tại {centerName}</h2>
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
						style={{
							marginRight: 8,
							backgroundColor: '#0cd14e',
							color: 'white',
						}}
					>
						Thêm khóa học mới
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
						dataSource={filteredCourses.length ? filteredCourses : []}
						onChange={onChange}
						locale={{
							emptyText: (
								<Empty
									description="Không có khóa học để hiển thị"
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

export default ListCourseCenter;
