import { Alert, Button, Card, Col, Input, Row, Spin, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import TeacherLayout from '@/layouts/teacher';
import { Class } from '@/schemas/class.schema';
import { Teacher } from '@/schemas/teacher.schema';
import {
	selectEmail,
	selectToken,
	setAvatar,
	setFullName,
} from '@/slices/teacher';
import { apiBaseUrl } from '@/utils/apiBase';

const ClassesPage: React.FC = () => {
	const email = useSelector(selectEmail);
	const token = useSelector(selectToken);
	const [isMounted, setIsMounted] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate('../teacher/login');
		}

		async function fetchMyAPI() {
			const responseAvatar = await axios.get(
				apiBaseUrl + `/api/teachers/email/${email}`,
			);

			if (responseAvatar.data.avatar && responseAvatar.data.fullName) {
				dispatch(setAvatar(responseAvatar.data.avatar));
				dispatch(setFullName(responseAvatar.data.fullName));
			}
		}
		fetchMyAPI();
		setIsMounted(true);
	}, [token, email, dispatch, navigate]);

	const [classes, setClasses] = useState<Class[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [searchValue, setSearchValue] = useState<string>(''); // Giá trị tìm kiếm
	const [filteredClasses, setFilteredClasses] = useState<Class[]>([]); // Lớp học đã lọc

	// Lấy dữ liệu từ API
	useEffect(() => {
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
				setClasses(fullClasses);
				setFilteredClasses(fullClasses); // Đặt lớp học ban đầu là toàn bộ danh sách
			} catch (err: any) {
				setError('Không thể tải danh sách lớp học');
			} finally {
				setLoading(false);
			}
		};

		fetchClassesForTeacher();
	}, [email]);

	// Lọc dữ liệu khi giá trị tìm kiếm thay đổi
	useEffect(() => {
		// Chỉ lọc nếu có giá trị tìm kiếm, nếu không hiển thị tất cả lớp
		const filtered = classes.filter((cls) =>
			cls.name.toLowerCase().includes(searchValue.toLowerCase()),
		);
		setFilteredClasses(filtered);
	}, [searchValue, classes]);

	const columns = [
		{
			title: 'STT',
			dataIndex: 'index',
			key: 'index',
			render: (_: any, __: any, index: number) => index + 1,
			align: 'center',
		},
		{
			title: 'Tên Lớp',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
		},
		{
			title: 'Học sinh',
			dataIndex: 'students',
			key: 'students',
			render: (students: { fullName: string }[]) => students.length,
			align: 'center',
		},
		{
			title: 'Tiết học',
			dataIndex: 'slots',
			key: 'slots',
			render: (slots: { fullName: string }[]) => slots.length,
			align: 'center',
		},
		{
			title: 'Khóa học',
			dataIndex: ['course', 'title'],
			key: 'courses',
			align: 'center',
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: (_: any, record: Class) => (
				<Button
					color="default"
					variant="solid"
					type="primary"
					onClick={() => navigate(`/teacher/classes/${record._id}`)}
				>
					Xem chi tiết
				</Button>
			),
			align: 'center',
		},
	];

	if (!isMounted) {
		return null;
	} else
		return (
			<TeacherLayout>
				<Row justify="center" style={{ padding: '16px 0' }}>
					<Col xs={24} lg={20}>
						<Card
							bordered={false}
							style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
						>
							<h2 style={{ textAlign: 'center' }}>DANH SÁCH CÁC LỚP HỌC</h2>
							<Row justify="end" style={{ marginBottom: 16 }}>
								<Col>
									<Input
										placeholder="Tìm kiếm"
										value={searchValue}
										onChange={(e) => setSearchValue(e.target.value)} // Cập nhật giá trị tìm kiếm
										style={{ width: 200 }}
									/>
								</Col>
							</Row>
							{loading && <Spin size="large" />}
							{error && (
								<Alert
									message="Lỗi"
									description={error}
									type="error"
									showIcon
								/>
							)}
							{!loading && !error && (
								<Table
									columns={columns}
									dataSource={filteredClasses} // Sử dụng dữ liệu đã lọc
									rowKey="_id"
									pagination={{ pageSize: 10 }}
									scroll={{ x: 'max-content' }}
									style={{ whiteSpace: 'nowrap' }}
								/>
							)}
						</Card>
					</Col>
				</Row>
			</TeacherLayout>
		);
};

export default ClassesPage;
