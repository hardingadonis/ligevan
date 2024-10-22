import React from 'react';
import { useNavigate } from 'react-router-dom';

import CourseForm from '@/components/admin/CourseForm';
import AdminLayout from '@/layouts/admin';

const CreateCoursePage: React.FC = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate('/admin/courses');
	};

	return (
		<AdminLayout>
			<div
				style={{
					maxWidth: 800,
					margin: '0 auto',
					padding: '24px',
				}}
			>
				<CourseForm onSuccess={handleGoBack} />
			</div>
		</AdminLayout>
	);
};

export default CreateCoursePage;
