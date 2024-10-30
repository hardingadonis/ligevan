/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { SaveOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { Alert, Button, Input, Radio, Spin, Table, message } from 'antd';
import type { ColumnType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Attendance, CheckAttendance } from '@/schemas/attendance.schema';
import { checkAttendances } from '@/services/api/attendance';
import {
	getSlotById,
	getStudentsInClassBySlotId,
	updateSlot,
} from '@/services/api/slot';

interface FormCheckAttendancesProps {
	slotId: string;
}

interface Student {
	key: string;
	id: string;
	fullName: string;
	phone: string;
	gender: string;
	attendance: string;
	avatar: string;
}

const FormCheckAttendances: React.FC<FormCheckAttendancesProps> = ({
	slotId,
}) => {
	const [data, setData] = useState<Student[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [searchText, setSearchText] = useState<string>('');
	const fallbackImage = import.meta.env.VITE_AVATAR_URL as string;
	const navigate = useNavigate();

	const fetchStudents = async () => {
		setLoading(true);
		try {
			const students = await getStudentsInClassBySlotId(slotId);
			const slot = await getSlotById(slotId);
			const attendances = slot.attendances;
			const isSlotDone = slot.isDone;

			const formattedStudents = students
				? students.map((student: any, index: number) => {
						const studentId = student._id ? student._id.toString() : null;
						if (!studentId) {
							console.error('Student ID is null:', student); // Debug log
						}
						const attendanceRecord = attendances?.find(
							(attendance: Attendance) =>
								attendance.student.toString() === studentId,
						);
						console.log('Attendance record:', attendanceRecord); // Debug log
						let status = 'absent';

						if (isSlotDone) {
							if (attendanceRecord) {
								status = attendanceRecord.status;
							}
						}

						const attendanceStatus = status;

						return {
							key: (index + 1).toString(),
							id: studentId,
							fullName: student.fullName,
							phone: student.phone,
							gender: student.gender === 'male' ? 'Nam' : 'Nữ',
							attendance: attendanceStatus,
							avatar: student.avatar,
						};
					})
				: [];
			formattedStudents.sort((a, b) => a.fullName.localeCompare(b.fullName));
			setData(formattedStudents);
		} catch (error) {
			setError('Không thể tải danh sách học sinh');
			console.error('Error fetching students:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchStudents();
	}, [slotId]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	const handleRefresh = () => {
		fetchStudents();
	};

	const handleAttendanceChange = (key: string, value: string) => {
		setData((prevData) =>
			prevData.map((student) =>
				student.key === key ? { ...student, attendance: value } : student,
			),
		);
	};

	const handleSave = async () => {
		const attendances: CheckAttendance[] = data.map((student) => {
			if (!student.id) {
				console.error('Student ID is missing for:', student);
			}
			return {
				student: student.id,
				status: student.attendance === 'attended' ? 'attended' : 'absent',
			};
		});

		try {
			const response = await checkAttendances(slotId, attendances);

			await updateSlot(
				{
					...response.slot,
					isDone: true,
				},
				slotId,
			);

			message.success('Điểm danh thành công', 2);

			// Refetch the updated data
			await fetchStudents();

			navigate('/teacher/schedule');
		} catch (error) {
			console.error('Error saving attendance:', error);
		}
	};

	const filteredData = data.filter(
		(item) =>
			item.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
			item.phone.toLowerCase().includes(searchText.toLowerCase()) ||
			item.gender.toLowerCase().includes(searchText.toLowerCase()),
	);

	const columns: ColumnType<Student>[] = [
		{
			title: 'STT',
			dataIndex: 'key',
			width: '5%',
			align: 'center',
		},
		{
			title: 'Ảnh',
			dataIndex: 'avatar',
			width: '10%',
			align: 'center',
			render: (text) => (
				<img
					src={text}
					alt="student"
					style={{ width: '70px', height: '70px', borderRadius: '50%' }}
					onError={(e) => {
						e.currentTarget.src = fallbackImage || 'defaultFallbackImage.jpg';
					}}
				/>
			),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Họ và tên</div>,
			dataIndex: 'fullName',
			width: '25%',
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'phone',
			width: '20%',
			align: 'center',
		},
		{
			title: 'Giới tính',
			dataIndex: 'gender',
			width: '10%',
			align: 'center',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'attendance',
			width: '20%',
			align: 'center',
			render: (text, record) => (
				<Radio.Group
					value={text}
					onChange={(e) => handleAttendanceChange(record.key, e.target.value)}
				>
					<Radio value="attended">Có mặt</Radio>
					<Radio value="absent">Vắng mặt</Radio>
				</Radio.Group>
			),
		},
	];

	return (
		<div style={{ paddingLeft: '270px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<h2>Điểm danh</h2>
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
				<>
					<Table<Student>
						columns={columns}
						dataSource={filteredData}
						pagination={false}
						rowClassName={(_, index) =>
							index % 2 === 0 ? 'table-row-even' : 'table-row-odd'
						}
						scroll={{ x: true }}
						style={{ backgroundColor: '#fff', borderRadius: '10px' }}
					/>
					<div style={{ textAlign: 'right', marginTop: '20px' }}>
						<Button
							type="primary"
							icon={<SaveOutlined />}
							onClick={handleSave}
							style={{ backgroundColor: '#0cd14e', color: 'white' }}
						>
							Lưu Lại
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

export default FormCheckAttendances;
