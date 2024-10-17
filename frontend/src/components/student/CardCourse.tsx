import { Card } from 'antd';
import React from 'react';

import { Course } from '@/schemas/course.schema';

const { Meta } = Card;

interface CourseCardProps {
	course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => (
	<Card hoverable cover={<img alt={course.title} src={course.thumbnail} />}>
		<Meta title={course.title} description={course.description} />
	</Card>
);

export default CourseCard;
