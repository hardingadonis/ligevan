import {
	CheckCircleOutlined,
	ClockCircleOutlined,
	CloseCircleOutlined,
	SyncOutlined,
} from '@ant-design/icons';
import { L10n, loadCldr } from '@syncfusion/ej2-base';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import {
	Day,
	Inject,
	Month,
	ScheduleComponent,
	Week,
	WorkWeek,
} from '@syncfusion/ej2-react-schedule';
import '@syncfusion/ej2-react-schedule/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import { Button, Col, Row, Tag, Typography } from 'antd';
import * as gregorian from 'cldr-data/main/vi/ca-gregorian.json';
import * as numberingSystems from 'cldr-data/main/vi/numbers.json';
import * as timeZoneNames from 'cldr-data/main/vi/timeZoneNames.json';
import * as weekData from 'cldr-data/supplemental/weekData.json';
import React, { useEffect, useRef, useState } from 'react';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import DropdownCenter from '@/components/teacher/DropdownCenter';
import DropdownCourse from '@/components/teacher/DropdownCourse';
import { Center } from '@/schemas/center.schema';
import { Course } from '@/schemas/course.schema';
import { Slot } from '@/schemas/slot.schema';
import { checkAttendanceStatus } from '@/services/api/attendance';
import { getAllCenter, getCenterById } from '@/services/api/center';
import { getSlotsByStudentEmail } from '@/services/api/slot';
import { fetchStudentData } from '@/services/custom/getStudentbyToken';
import { convertToUTC } from '@/utils/dateFormat';
import { decodeToken } from '@/utils/jwtDecode';

loadCldr(numberingSystems, gregorian, timeZoneNames, weekData);

L10n.load({
	vi: {
		schedule: {
			day: 'Ngày',
			week: 'Tuần',
			workWeek: 'Tuần làm việc',
			month: 'Tháng',
			today: 'Hôm nay',
			noEvents: 'Không có sự kiện',
			allDay: 'Cả ngày',
			start: 'Bắt đầu',
			end: 'Kết thúc',
			more: 'Thêm',
		},
	},
});

interface ExtendedSlot extends Slot {
	centerName: string;
	Description: string;
}

const SetupSchedules: React.FC = () => {
	const [slots, setSlots] = useState<ExtendedSlot[]>([]);
	const [centers, setCenters] = useState<Center[]>([]);
	const [selectedCenter, setSelectedCenter] = useState<string | undefined>(
		'all',
	);
	const [courses, setCourses] = useState<Course[]>([]);
	const [selectedCourse, setSelectedCourse] = useState<string | undefined>(
		'all',
	);
	const scheduleRef = useRef<ScheduleComponent>(null);
	const [isReadOnly, setIsReadOnly] = useState<boolean>(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decoded = decodeToken(token);
			if (decoded.role !== 'admin') {
				setIsReadOnly(true);
			}
		}
	}, []);

	useEffect(() => {
		const fetchCenters = async () => {
			try {
				const data = await getAllCenter();
				setCenters(data);
			} catch (error) {
				console.error('Error fetching centers:', error);
			}
		};
		fetchCenters();
	}, []);

	const fetchSlots = async () => {
		try {
			const email = (await fetchStudentData()).email;
			const allSlots = await getSlotsByStudentEmail(email);
			const convertedData: ExtendedSlot[] = await Promise.all(
				allSlots.map(async (slot) => {
					const center = await getCenterById(slot.class.center.toString());
					const status = await checkAttendanceStatus(email, slot._id);
					let description = 'Chưa học';
					if (status === 'attended') {
						description = 'Đã điểm danh';
					} else if (status === 'absent') {
						description = 'Vắng mặt';
					}

					return {
						...slot,
						start: convertToUTC(new Date(slot.start)),
						end: convertToUTC(new Date(slot.end)),
						centerName: center.name,
						Description: description,
					};
				}),
			);
			setSlots(convertedData);
		} catch (error) {
			console.error('Error fetching slots:', error);
		}
	};

	useEffect(() => {
		fetchSlots();
	}, []);

	useEffect(() => {
		if (scheduleRef.current) {
			scheduleRef.current.scrollTo('07:00');
		}
	}, [slots]);

	const handleCenterChange = (value: string) => {
		setSelectedCenter(value);
		const selected = centers.find((center) => center._id === value);
		if (selected?.courses) {
			setCourses(selected.courses);
		} else {
			setCourses([]);
		}
		setSelectedCourse('all');
	};

	const handleCourseChange = (value: string) => {
		setSelectedCourse(value);
	};

	const handleRefresh = () => {
		fetchSlots();
	};

	const filteredSlots = slots.filter((slot) => {
		const centerMatch =
			selectedCenter === 'all' ||
			slot.class.center.toString() === selectedCenter;
		const courseMatch =
			selectedCourse === 'all' ||
			slot.class.course.toString() === selectedCourse;
		return centerMatch && courseMatch;
	});

	const events = filteredSlots.map((slot) => ({
		Id: slot._id,
		Subject: `Lớp: ${slot.class.name}`,
		StartTime: slot.start,
		EndTime: slot.end,
		Location: slot.room,
		Description: slot.Description,
		IsAllDay: false,
		CenterName: slot.centerName,
	}));

	const eventTemplate = (props: {
		Subject: string;
		Description: string;
		StartTime: string;
		EndTime: string;
		Id: string;
		Location: string;
		CenterName: string;
	}) => {
		let icon;
		let color;

		if (props.Description === 'Đã điểm danh') {
			icon = <CheckCircleOutlined />;
			color = 'success';
		} else if (props.Description === 'Vắng mặt') {
			icon = <CloseCircleOutlined />;
			color = 'error';
		} else {
			icon = <ClockCircleOutlined />;
			color = 'default';
		}

		return (
			<div style={{ padding: '5px' }}>
				<div>
					<h3>{props.Subject}</h3>
				</div>
				<div style={{ marginTop: '7px' }}>
					{new Date(props.StartTime).toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit',
					})}{' '}
					-{' '}
					{new Date(props.EndTime).toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit',
					})}
				</div>
				<div style={{ marginTop: '5px' }}>
					<strong>{props.CenterName}</strong>
				</div>
				<div style={{ marginTop: '5px' }}>
					<strong>Tại phòng: </strong>
					{props.Location}
				</div>
				<div style={{ marginTop: '10px' }}>
					<Tag icon={icon} color={color}>
						{props.Description}
					</Tag>
				</div>
			</div>
		);
	};

	return (
		<div>
			<Row>
				<Col span={2}>
					<ButtonGoBack />
				</Col>
				<Col span={20}>
					<Typography.Title level={2} style={{ textAlign: 'center' }}>
						Lịch Học
					</Typography.Title>
				</Col>
			</Row>

			<Row>
				<Col span={20}>
					<div style={{ display: 'flex', marginTop: '20px' }}>
						<DropdownCenter
							centers={centers}
							selectedCenter={selectedCenter || 'all'}
							onChange={handleCenterChange}
						/>
						{selectedCenter !== 'all' && (
							<DropdownCourse
								courses={courses}
								selectedCourse={selectedCourse || 'all'}
								onChange={handleCourseChange}
							/>
						)}
					</div>
				</Col>
				<Col span={4}>
					<div style={{ marginTop: '20px' }}>
						<Button
							type="default"
							icon={<SyncOutlined />}
							onClick={handleRefresh}
							style={{ float: 'right' }}
						>
							Làm mới
						</Button>
					</div>
				</Col>
			</Row>

			<ScheduleComponent
				ref={scheduleRef}
				height="650px"
				startHour="07:00"
				endHour="17:15"
				eventSettings={{ dataSource: events, template: eventTemplate }}
				locale="vi"
				style={{ marginTop: '15px' }}
				views={['Day', 'Week', 'WorkWeek', 'Month']}
				readonly={isReadOnly}
			>
				<Inject services={[Day, Week, WorkWeek, Month]} />
			</ScheduleComponent>
		</div>
	);
};

export default SetupSchedules;
