import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';
import {
	Alert,
	Button,
	Card,
	Col,
	Empty,
	Modal,
	Row,
	Spin,
	Table,
	TableColumnsType,
} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Center } from '@/schemas/center.schema';
import { Class } from '@/schemas/class.schema';
import { Course } from '@/schemas/course.schema';
import { fetchStudentData } from '@/services/custom/getStudentbyToken';
import { apiBaseUrl } from '@/utils/apiBase';

const MAX_STUDENTS = parseInt(
	import.meta.env.REACT_APP_MAX_STUDENTS || '20',
	10,
);

interface DataType {
	key: string;
	name: string;
	teacher: string;
	students: string;
	actions: JSX.Element;
}

const CourseDetail: React.FC = () => {
	const { courseID } = useParams<{ courseID: string }>();
	const { centerID } = useParams<{ centerID: string }>();
	const [course, setCourse] = useState<Course | null>(null);
	const [center, setCenter] = useState<Center | null>(null);
	const [classes, setClasses] = useState<Class[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const fetchCenter = async () => {
		try {
			const fetchCenter = await axios.get(
				`${apiBaseUrl}/api/centers/${centerID}`,
			);
			setCenter(fetchCenter.data);
			console.log('center' + fetchCenter.data);
		} catch (err) {
			console.log('error' + err);
			setError('Failed to fetch course data.');
		}
	};

	const fetchCourse = async () => {
		try {
			const fetchedCourse = await axios.get(
				`${apiBaseUrl}/api/courses/${courseID}`,
			);
			setCourse(fetchedCourse.data);
		} catch (err) {
			console.log(err);
			setError('Failed to fetch course data.');
		}
	};

	const fetchClasses = async () => {
		setLoading(true);
		try {
			if (centerID && courseID) {
				const fetchedClasses = await axios.get(
					`${apiBaseUrl}/api/classes/${centerID}/courses/${courseID}/class`,
				);
				const classesData = fetchedClasses.data;

				const classRequests = classesData.map((cls: Class) =>
					axios.get<Class>(`${apiBaseUrl}/api/classes/${cls._id}`),
				);

				const classResponses = await Promise.all(classRequests);
				const fullClassesData = classResponses.map((response) => response.data);

				setClasses(fullClassesData);
			} else {
				setError('Center ID or Course ID is not provided.');
			}
		} catch {
			setError('Không thể tải danh sách lớp học');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCourse();
		fetchClasses();
		fetchCenter();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [centerID, courseID]);

	if (!course) {
		return <Alert message="Course not found" type="warning" showIcon />;
	}

	const renderActions = (id: string): JSX.Element => (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Button
				icon={<CheckCircleOutlined />}
				onClick={() => handleRegister(id)}
				style={{ backgroundColor: '#0cd14e', color: 'white' }}
			>
				Đăng kí
			</Button>
		</div>
	);

	const handleRefresh = () => {
		fetchClasses();
	};

	const handleRegister = async (id: string) => {
		try {
			const student = await fetchStudentData();
			console.log('student' + student);
			if (!student) {
				Modal.warning({
					title: 'Vui lòng đăng nhập',
					content: 'Vui lòng đăng nhập trước khi đăng ký lớp học.',
				});
				return;
			}

			const selectedClass = classes.find((cls) => cls._id === id);
			const currentStudentCount = selectedClass?.students?.length ?? 0;

			if (currentStudentCount >= MAX_STUDENTS) {
				Modal.warning({
					title: 'Lớp học đã đầy',
					content: `Số lượng học sinh đăng ký đã đạt giới hạn tối đa là ${MAX_STUDENTS} học sinh.`,
				});
			} else {
				navigate(`/student/payment/${courseID}/${centerID}`, {
					state: { classID: id },
				});
			}
		} catch {
			Modal.warning({
				title: 'Vui lòng đăng nhập',
				content: 'Vui lòng đăng nhập trước khi đăng ký lớp học.',
				centered: true,
			});
		}
	};

	const tableData = classes.map((cls, index) => ({
		key: (index + 1).toString(),
		name: cls.name,
		teacher: cls.teacher.fullName,
		students: `${cls.students?.length ?? 0}/${MAX_STUDENTS}`,
		actions: renderActions(cls._id),
	}));

	const columns: TableColumnsType<DataType> = [
		{
			title: <div style={{ textAlign: 'center' }}>Tên Lớp</div>,
			dataIndex: 'name',
			width: '30%',
			sorter: (a, b) => a.name.localeCompare(b.name),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Giáo viên</div>,
			dataIndex: 'teacher',
			width: '20%',
			sorter: (a, b) => a.teacher.localeCompare(b.teacher),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Số học sinh đã đăng ký</div>,
			dataIndex: 'students',
			width: '25%',
			sorter: (a, b) => a.students.localeCompare(b.students),
			align: 'center',
		},
		{
			title: <div style={{ textAlign: 'center' }}>Thao tác</div>,
			dataIndex: 'actions',
			width: '20%',
			align: 'center',
		},
	];

	return (
		<div style={{ padding: '20px' }}>
			<Row gutter={[16, 16]} justify="center">
				<Col xs={24} sm={12}>
					<Card
						style={{
							textAlign: 'center',
							border: '1px solid black',
							borderRadius: '0px',
							padding: '24px',
							boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						<h3
							style={{
								textTransform: 'uppercase',
								fontWeight: 'bold',
								fontSize: '24px',
								marginBottom: '16px',
							}}
						>
							{center?.name}
						</h3>
						<h3
							style={{
								textTransform: 'uppercase',
								fontWeight: 'bold',
								fontSize: '24px',
								marginBottom: '16px',
							}}
						>
							{course.title}
						</h3>
						<p
							style={{
								textTransform: 'uppercase',
								fontWeight: 'bold',
								fontSize: '16px',
								color: '#555',
								marginBottom: '12px',
							}}
						>
							{course.description}
						</p>
						<p
							style={{
								textTransform: 'uppercase',
								fontWeight: 'bold',
								fontSize: '18px',
								color: '#ff4d4f',
							}}
						>
							Giá chỉ: {course.price.toLocaleString('vi-VN')} VND
						</p>
					</Card>
				</Col>
				<Col xs={24} sm={12}>
					<Card
						hoverable
						cover={
							<img
								src={course.thumbnail}
								alt={course.title}
								style={{ width: '100%', height: '250px', objectFit: 'cover' }}
							/>
						}
						bodyStyle={{ display: 'none' }}
						style={{ height: '100%' }}
					/>
				</Col>
			</Row>
			<div
				style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}
			>
				<Button
					type="default"
					icon={<SyncOutlined />}
					onClick={handleRefresh}
					style={{ marginRight: 8 }}
				>
					Làm mới
				</Button>
			</div>
			{loading && <Spin size="large" />}
			{error && (
				<Alert message="Lỗi" description={error} type="error" showIcon />
			)}
			{!loading && !error && (
				<div
					style={{ overflow: 'auto', marginBottom: '60px', marginTop: '10px' }}
				>
					<Table<DataType>
						columns={columns}
						dataSource={tableData}
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

export default CourseDetail;
