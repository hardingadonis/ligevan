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
import { Button, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

import { Slot } from '@/schemas/slot.schema';
import { getSlotsByTeacherEmail } from '@/services/api/slot';
import { convertToUTC } from '@/utils/dateFormat';

const Schedule: React.FC = () => {
	const [slots, setSlots] = useState<Slot[]>([]);

	useEffect(() => {
		const fetchSlots = async () => {
			try {
				const teacherEmail = localStorage.getItem('teacherEmail');
				if (!teacherEmail) {
					throw new Error('Teacher email not found in local storage');
				}
				const data = await getSlotsByTeacherEmail(teacherEmail);
				const convertedData = data.map((slot) => ({
					...slot,
					start: convertToUTC(new Date(slot.start)),
					end: convertToUTC(new Date(slot.end)),
				}));

				setSlots(convertedData);
			} catch (error) {
				console.error('Error fetching slots:', error);
			}
		};
		fetchSlots();
	}, []);

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
	}) => (
		<div style={{ paddingTop: '5px' }}>
			<div>
				<strong>{props.Subject}</strong>
			</div>
			<div style={{ marginTop: '5px' }}>
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
				style={{ marginTop: '5px' }}
			>
				Điểm danh
			</Button>
		</div>
	);

	return (
		<div style={{ paddingLeft: '270px' }}>
			<ScheduleComponent
				height="650px"
				startHour="07:00"
				endHour="21:00"
				eventSettings={{ dataSource: events, template: eventTemplate }}
			>
				<Inject services={[Day, Week, WorkWeek, Month]} />
			</ScheduleComponent>
		</div>
	);
};

export default Schedule;
