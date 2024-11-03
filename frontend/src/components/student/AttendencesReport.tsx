import ButtonGoBack from '../commons/ButtonGoback';
import { SyncOutlined } from '@ant-design/icons';
import {
	Alert,
	Button,
	Col,
	Empty,
	Spin,
	Table,
	TableColumnsType,
	Typography,
} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Class } from '@/schemas/class.schema';
import { Slot } from '@/schemas/slot.schema';
import { Student } from '@/schemas/student.schema';
import { fetchStudentData } from '@/services/custom/getStudentbyToken';
import { apiBaseUrl } from '@/utils/apiBase';
import {
	formatDateToVietnamTimezone,
	formatTimeToVietnamTimezone,
} from '@/utils/dateFormat';

interface DataType {
	key: string;
	room: string;
	date: string;
	start: string;
	end: string;
	status: string;
}

const AttendencesReportForStudent: React.FC = () => {
	const { classID } = useParams<{ classID: string }>();
	const [data, setData] = useState<DataType[]>([]);
	const [classData, setClassData] = useState<Class | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [student, setStudent] = useState<Student | null>(null);

	const fetchStudent = async () => {
		setLoading(true);
		try {
			const studentData = await fetchStudentData();
			setStudent(studentData);
		} catch (error) {
			console.error('Error fetching student:', error);
		} finally {
			setLoading(false);
		}
	};

	const fetchClass = async () => {
		setLoading(true);
		try {
			const fetchClass = await axios.get(
				`${apiBaseUrl}/api/classes/${classID}`,
			);
			setClassData(fetchClass.data);
		} catch {
			setError('Không thể tải thông tin điểm danh chi tiết của học sinh');
		} finally {
			setLoading(false);
		}
	};

	const fetchSlot = async () => {
		setLoading(true);
		try {
			const slots = classData?.slots || [];
			const slotRequests = slots.map((slt: Slot) =>
				axios.get<Slot>(`${apiBaseUrl}/api/slots/${slt._id}`),
			);

			const slotResponses = await Promise.all(slotRequests);
			const fullSlots = slotResponses.map((response) => response.data);

			const tableData = fullSlots.map((slt, index) => {
				const attendance =
					student && slt.attendances
						? slt.attendances.find(
								(att) => att.student.toString() === student._id,
							)
						: null;

				let statusMessage = 'Chưa có dữ liệu';

				if (attendance) {
					if (attendance.status === 'attended') {
						statusMessage = 'Có mặt';
					} else if (attendance.status === 'absent') {
						statusMessage = 'Vắng mặt';
					} else {
						statusMessage = 'Chưa tới';
					}
				}
				return {
					key: (index + 1).toString(),
					room: slt.room,
					date: formatDateToVietnamTimezone(slt.start),
					start: formatTimeToVietnamTimezone(slt.start),
					end: formatTimeToVietnamTimezone(slt.end),
					status: statusMessage,
				};
			});

			setData(tableData);
		} catch (err) {
			console.error(err);
			setError('Không thể tải thông tin điểm danh chi tiết của học sinh');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchStudent();
	}, []);

	useEffect(() => {
		fetchClass();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [classID]);

	useEffect(() => {
		if (classData) {
			fetchSlot();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [classData]);

	const handleRefresh = () => {
		fetchSlot();
	};

	if (loading) return <Spin size="large" />;
	if (error)
		return <Alert message="Error" description={error} type="error" showIcon />;
	if (!classData)
		return (
			<Empty description="Student not found" imageStyle={{ height: 60 }} />
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
			title: <div style={{ textAlign: 'center' }}>Phòng học</div>,
			dataIndex: 'room',
			width: '25%',
			align: 'center',
			sorter: (a, b) => a.room.localeCompare(b.room),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Ngày học</div>,
			dataIndex: 'date',
			width: '20%',
			align: 'center',
			sorter: (a, b) => a.date.localeCompare(b.date),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Bắt đầu</div>,
			dataIndex: 'start',
			width: '15%',
			align: 'center',
			sorter: (a, b) => a.start.localeCompare(b.start),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Kết thúc</div>,
			dataIndex: 'end',
			width: '15%',
			align: 'center',
			sorter: (a, b) => a.end.localeCompare(b.end),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Trạng thái</div>,
			dataIndex: 'status',
			width: '20%',
			align: 'center',
			sorter: (a, b) => a.status.localeCompare(b.status),
		},
	];

	return (
		<div>
			<Col span={2}>
				<ButtonGoBack />
			</Col>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<Typography.Title level={2}>{classData.name}</Typography.Title>
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					marginBottom: 20,
				}}
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
				<div style={{ overflow: 'auto', marginBottom: '60px' }}>
					<Table<DataType>
						columns={columns}
						dataSource={data}
						locale={{
							emptyText: (
								<Empty
									description="Không có thông tin điểm danh chi tiết của học sinh khớp với bạn tìm kiếm"
									imageStyle={{ height: 60 }}
								/>
							),
						}}
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

export default AttendencesReportForStudent;
