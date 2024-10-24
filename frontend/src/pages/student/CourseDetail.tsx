import React from 'react';

import StudentCourseDetail from '@/components/student/CourseDetail';
import StudentLayoutNoSidebar from '@/layouts/student/student.noSidebar';

const CourseDetail: React.FC = () => {
	return (
		<StudentLayoutNoSidebar>
			<StudentCourseDetail />
		</StudentLayoutNoSidebar>
	);
};

export default CourseDetail;
