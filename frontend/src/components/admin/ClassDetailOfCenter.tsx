/* eslint-disable react-hooks/exhaustive-deps */
import { SyncOutlined } from '@ant-design/icons';
import {
	Alert,
	Button,
	Col,
	Empty,
	Row,
	Spin,
	Table,
	TableColumnsType,
	Typography,
} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Class } from '@/schemas/class.schema';
import { Slot } from '@/schemas/slot.schema';
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

const ClassDetailOfCenter: React.FC = () => {
	const { classID } = useParams<{ classID: string }>();
	const [data, setData] = useState<DataType[]>([]);
	const [classData, setClassData] = useState<Class | null>(null);
	const [centerID, setCenterID] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [dataLoading, setDataLoading] = useState<boolean>(false); // Trạng thái tải riêng cho bảng
	const [error, setError] = useState<string | null>(null);
	const [teacherName, setTeacherName] = useState<string>(''); // Tên lớp
	const [studentsCount, setStudentsCount] = useState<number>(0); // Số học sinh
	const [slotsCount, setSlotsCount] = useState<number>(0); // Số tiết học

	const fetchClass = async () => {
		setLoading(true);
		try {
			const fetchClass = await axios.get(
				`${apiBaseUrl}/api/classes/${classID}`,
			);
			setClassData(fetchClass.data);
			setCenterID(fetchClass.data.center._id);
			setTeacherName(fetchClass.data.teacher.fullName);
			setStudentsCount(fetchClass.data.students?.length ?? 0);
			setSlotsCount(fetchClass.data.slots?.length ?? 0);
		} catch {
			setError('Không thể tải thông tin lịch học của lớp học');
		} finally {
			setLoading(false);
		}
	};

	const fetchSlot = async () => {
		setDataLoading(true); // Bắt đầu tải lại bảng
		try {
			const slots = classData?.slots || [];
			const slotRequests = slots.map((slt: Slot) =>
				axios.get<Slot>(`${apiBaseUrl}/api/slots/${slt._id}`),
			);

			const slotResponses = await Promise.all(slotRequests);
			const fullSlots = slotResponses.map((response) => response.data);

			const tableData = fullSlots.map((slt, index) => {
				const statusMessage = slt.isDone ? 'Đã xong' : 'Chưa xong';

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
			setError('Không thể tải thông tin lịch học của lớp học');
		} finally {
			setDataLoading(false);
		}
	};

	useEffect(() => {
		fetchClass();
	}, [classID]);

	useEffect(() => {
		if (classData) {
			fetchSlot();
		}
	}, [classData]);

	const handleRefresh = () => {
		fetchSlot();
	};

	if (loading) return <Spin size="large" />;
	if (error)
		return <Alert message="Error" description={error} type="error" showIcon />;
	if (!classData)
		return (
			<Empty
				description="Không tìm thấy lịch học"
				imageStyle={{ height: 60 }}
			/>
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
		<div style={{ paddingLeft: '270px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<div style={{ textAlign: 'left' }}>
					<ButtonGoBack link={`/admin/centers/${centerID}/classes`} />
				</div>
				<Typography.Title level={2}>{classData.name}</Typography.Title>
			</div>

			<Row
				justify="space-between"
				align="middle"
				style={{ marginBottom: '20px' }}
			>
				<Col>
					<Typography.Text>
						TÊN GIÁO VIÊN: <strong>{teacherName}</strong>
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
				</Col>
			</Row>
			<div style={{ overflow: 'auto', marginBottom: '60px' }}>
				<Table<DataType>
					columns={columns}
					dataSource={data}
					loading={dataLoading}
					locale={{
						emptyText: (
							<Empty
								description="Không có thông tin lịch học của lớp học khớp với bạn tìm kiếm"
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
		</div>
	);
};

export default ClassDetailOfCenter;
