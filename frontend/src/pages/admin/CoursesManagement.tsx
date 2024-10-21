import React from 'react';

import ListCourses from '@/components/admin/ListCourses';
import AdminLayout from '@/layouts/admin';

const AdminCoursesManagement: React.FC = () => {
	return (
		<AdminLayout>
			<ListCourses />
		</AdminLayout>
	);
};

export default AdminCoursesManagement;
