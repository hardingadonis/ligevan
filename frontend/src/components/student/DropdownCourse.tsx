import { BookOutlined } from '@ant-design/icons';
import { Select, Typography } from 'antd';
import React from 'react';

import { Course } from '@/schemas/course.schema';

interface DropdownCourseProps {
	courses: Course[];
	selectedCourse: string;
	onChange: (value: string) => void;
}

const DropdownCourse: React.FC<DropdownCourseProps> = ({
	courses,
	selectedCourse,
	onChange,
}) => (
	<div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
		<Typography.Text style={{ fontWeight: 'bold', marginRight: '8px' }}>
			Trong:
		</Typography.Text>
		<Select
			style={{ width: 'auto' }}
			placeholder="Select a course"
			onChange={onChange}
			value={selectedCourse}
			dropdownMatchSelectWidth={false}
		>
			<Select.Option key="all" value="all">
				Tất cả các khóa học
			</Select.Option>
			{courses.map((course) => (
				<Select.Option
					key={course._id}
					value={course._id}
					label={
						<>
							<BookOutlined style={{ marginRight: 8 }} />
							{course.title}
						</>
					}
				>
					<BookOutlined style={{ marginRight: 8 }} />
					{course.title}
				</Select.Option>
			))}
		</Select>
	</div>
);

export default DropdownCourse;
