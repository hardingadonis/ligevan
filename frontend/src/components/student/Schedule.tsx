import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
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
import { Col, Row, Tag, Typography } from 'antd';
import * as gregorian from 'cldr-data/main/vi/ca-gregorian.json';
import * as numberingSystems from 'cldr-data/main/vi/numbers.json';
import * as timeZoneNames from 'cldr-data/main/vi/timeZoneNames.json';
import * as weekData from 'cldr-data/supplemental/weekData.json';
import React, { useEffect, useRef, useState } from 'react';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import DropdownClass from '@/components/student/DropdownClass';
import DropdownCourse from '@/components/student/DropdownCourse';
import { Class } from '@/schemas/class.schema';
import { Course } from '@/schemas/course.schema';
import { Slot } from '@/schemas/slot.schema';
import { getClassesByStudentEmail } from '@/services/api/class';
import { filterSlotsForStudentSchedule } from '@/services/api/slot';
import { fetchStudentData } from '@/services/custom/getStudentbyToken';
import { convertToUTC } from '@/utils/dateFormat';

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
}

const Schedule: React.FC = () => {
	const [slots, setSlots] = useState<ExtendedSlot[]>([]);
	const [classes, setClasses] = useState<Class[]>([]);
	const [courses, setCourses] = useState<Course[]>([]);
	// Thay đổi giá trị mặc định thành null
	const [selectedClass, setSelectedClass] = useState<string | null>(null);
	const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
	const scheduleRef = useRef<ScheduleComponent>(null);

	useEffect(() => {
		const fetchClasses = async () => {
			try {
				const student = await fetchStudentData();
				const fetchedClasses = await getClassesByStudentEmail(student.email);
				setClasses(fetchedClasses);
				// Reset tất cả các state liên quan
				setSelectedClass(null);
				setSelectedCourse(null);
				setCourses([]);
			} catch (error) {
				console.error('Error fetching classes:', error);
			}
		};
		fetchClasses();
	}, []);

	useEffect(() => {
		const fetchFilteredSlots = async () => {
			if (!selectedClass) {
				setSlots([]);
				return;
			}

			try {
				const student = await fetchStudentData();
				const filteredSlots = await filterSlotsForStudentSchedule(
					student.email,
					selectedClass,
					selectedCourse || 'all',
				);

				const convertedData: ExtendedSlot[] = await Promise.all(
					filteredSlots.map(async (slot) => ({
						...slot,
						start: convertToUTC(new Date(slot.start)),
						end: convertToUTC(new Date(slot.end)),
						centerName: slot.class.center.name,
					})),
				);
				setSlots(convertedData);
			} catch (error) {
				console.error('Error fetching filtered slots:', error);
			}
		};
		fetchFilteredSlots();
	}, [selectedClass, selectedCourse]);

	useEffect(() => {
		if (scheduleRef.current) {
			scheduleRef.current.scrollTo('07:00');
		}
	}, [slots]);

	const handleClassChange = (selectedClass: Class | null) => {
		if (selectedClass) {
			setSelectedClass(selectedClass._id);
			setCourses([selectedClass.course]);
			setSelectedCourse('all');
		} else {
			// Reset tất cả khi không có lớp nào được chọn
			setSelectedClass(null);
			setSelectedCourse(null);
			setCourses([]);
			setSlots([]);
		}
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
		Description: slot.isDone ? 'Đã học' : 'Chưa học',
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
	}) => (
		<div
			style={{
				padding: '5px',
			}}
		>
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
				<Tag
					icon={
						props.Description === 'Đã học' ? (
							<CheckCircleOutlined />
						) : (
							<ClockCircleOutlined />
						)
					}
					color={props.Description === 'Đã học' ? 'success' : 'default'}
				>
					{props.Description}
				</Tag>
			</div>
		</div>
	);

	return (
		<div style={{ padding: '0 24px 24px 0px' }}>
			<Row>
				<Col span={2}>
					<ButtonGoBack />
				</Col>
				<Col span={20}>
					<Typography.Title level={2} style={{ textAlign: 'center' }}>
						Lịch học
					</Typography.Title>
				</Col>
			</Row>
			<div style={{ display: 'flex', marginTop: '20px', gap: '16px' }}>
				<DropdownClass
					onSelectClass={handleClassChange}
					selectedClass={
						classes.find((c: Class) => c._id === selectedClass) || null
					}
				/>
				{/* Chỉ hiển thị khi có lớp được chọn VÀ có courses */}
				{selectedClass !== null && courses && courses.length > 0 && (
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
				endHour="17:15"
				eventSettings={{ dataSource: events, template: eventTemplate }}
				locale="vi"
				style={{ marginTop: '15px' }}
				views={['Day', 'Week', 'WorkWeek', 'Month']}
			>
				<Inject services={[Day, Week, WorkWeek, Month]} />
			</ScheduleComponent>
		</div>
	);
};

export default Schedule;
