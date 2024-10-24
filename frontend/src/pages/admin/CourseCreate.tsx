import React from 'react';
import { useNavigate } from 'react-router-dom';

import CourseForm from '@/components/admin/FormCreateCourse';
import AdminLayout from '@/layouts/admin';

const CreateCoursePage: React.FC = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate('/admin/courses');
	};

	return (
		<AdminLayout>
			<CourseForm onSuccess={handleGoBack} />
		</AdminLayout>
	);
};

export default CreateCoursePage;
