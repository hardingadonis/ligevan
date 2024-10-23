import { Card } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Course } from '@/schemas/course.schema';

const { Meta } = Card;

interface CourseCardProps {
	course: Course;
	selectedCenterId: string | null;
}

const CourseCard: React.FC<CourseCardProps> = ({
	course,
	selectedCenterId,
}) => {
	const navigate = useNavigate();

	const handleCardClick = () => {
		navigate(`/student/courses/${course._id}/${selectedCenterId}`);
	};

	return (
		<Card
			hoverable
			cover={<img alt={course.title} src={course.thumbnail} />}
			onClick={handleCardClick}
		>
			<Meta title={course.title} description={course.description} />
		</Card>
	);
};

export default CourseCard;
