import '../../../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-lists/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-react-schedule/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
import {
	CheckCircleOutlined,
	ClockCircleOutlined,
	ScheduleOutlined,
} from '@ant-design/icons';
import {
	Day,
	Inject,
	Month,
	ScheduleComponent,
	Week,
	WorkWeek,
} from '@syncfusion/ej2-react-schedule';
import { Button, Tag, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import '@/assets/styles/schedule.css';
import DropdownCenter from '@/components/teacher/DropdownCenter';
import DropdownCourse from '@/components/teacher/DropdownCourse';
import { Center } from '@/schemas/center.schema';
import { Course } from '@/schemas/course.schema';
import { Slot } from '@/schemas/slot.schema';
import { getAllCenter } from '@/services/api/center';
import { filterSlotsforSchedule } from '@/services/api/slot';
import { convertToUTC } from '@/utils/dateFormat';
import { decodeToken } from '@/utils/jwtDecode';

const Schedule: React.FC = () => {
	const [slots, setSlots] = useState<Slot[]>([]);
	const [centers, setCenters] = useState<Center[]>([]);
	const [selectedCenter, setSelectedCenter] = useState<string | undefined>(
		'all',
	);
	const [courses, setCourses] = useState<Course[]>([]);
	const [selectedCourse, setSelectedCourse] = useState<string | undefined>(
		'all',
	);
	const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
	const scheduleRef = useRef<ScheduleComponent>(null);

	useEffect(() => {
		const token = localStorage.getItem('teacherToken');
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

	useEffect(() => {
		const fetchFilteredSlots = async () => {
			try {
				const teacherEmail = localStorage.getItem('teacherEmail');
				if (!teacherEmail) {
					throw new Error('Teacher email not found in local storage');
				}
				const filteredSlots = await filterSlotsforSchedule(
					teacherEmail,
					selectedCenter,
					selectedCourse,
				);
				const convertedData = filteredSlots.map((slot) => ({
					...slot,
					start: convertToUTC(new Date(slot.start)),
					end: convertToUTC(new Date(slot.end)),
				}));
				setSlots(convertedData);
			} catch (error) {
				console.error('Error fetching filtered slots:', error);
			}
		};
		fetchFilteredSlots();
	}, [selectedCenter, selectedCourse]);

	useEffect(() => {
		if (scheduleRef.current) {
			scheduleRef.current.scrollTo('07:00');
		}
	}, [slots]);

	const handleCenterChange = (value: string) => {
		setSelectedCenter(value);
		const selected = centers.find((center) => center._id === value);
		if (selected && selected.courses) {
			setCourses(selected.courses);
		} else {
			setCourses([]);
		}
		setSelectedCourse('all');
	};

	const handleCourseChange = (value: string) => {
		setSelectedCourse(value);
	};

	const events = slots.map((slot) => ({
		Id: slot._id,
		Subject: `Lớp: ${slot.class.name}`,
		StartTime: slot.start,
		EndTime: slot.end,
		Location: slot.room,
		Description: slot.isDone ? 'Đã dạy' : 'Chưa dạy',
		IsAllDay: false,
	}));

	const handleRedirect = (id: string) => {
		window.location.href = `/teacher/attendance/${id}`;
	};

	const eventTemplate = (props: {
		Subject: string;
		Description: string;
		StartTime: string;
		EndTime: string;
		Id: string;
		Location: string;
	}) => (
		<div
			style={{
				padding: '5px',
			}}
		>
			<div>
				<strong>{props.Subject}</strong>
			</div>
			<div style={{ marginTop: '10px' }}>
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
				<strong>Tại phòng: </strong>
				{props.Location}
			</div>
			<div style={{ marginTop: '10px' }}>
				<Tag
					icon={
						props.Description === 'Đã dạy' ? (
							<CheckCircleOutlined />
						) : (
							<ClockCircleOutlined />
						)
					}
					color={props.Description === 'Đã dạy' ? 'success' : 'default'}
				>
					{props.Description}
				</Tag>
			</div>
			<Button
				type="primary"
				icon={<ScheduleOutlined />}
				onClick={() => handleRedirect(props.Id)}
				style={{ marginTop: '10px' }}
			>
				Điểm danh
			</Button>
		</div>
	);

	return (
		<div style={{ paddingLeft: '270px' }}>
			<Typography.Title level={2} style={{ textAlign: 'center' }}>
				Lịch giảng dạy
			</Typography.Title>
			<div style={{ display: 'flex' }}>
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
			<ScheduleComponent
				ref={scheduleRef}
				height="650px"
				startHour="07:00"
				endHour="21:00"
				eventSettings={{ dataSource: events, template: eventTemplate }}
				readonly={isReadOnly}
			>
				<Inject services={[Day, Week, WorkWeek, Month]} />
			</ScheduleComponent>
		</div>
	);
};

export default Schedule;
