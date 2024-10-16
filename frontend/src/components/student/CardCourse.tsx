import React from 'react';
import { Card } from 'antd';
import { Course } from '@/models/course';

const { Meta } = Card;

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => (
  <Card
    hoverable
    cover={<img alt={course.title} src={course.thumbnail} />}
  >
    <Meta title={course.title} description={course.description} />
  </Card>
);

export default CourseCard;
