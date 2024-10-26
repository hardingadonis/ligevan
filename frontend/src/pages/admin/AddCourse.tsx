import React from 'react';

import AddCourseForm from '@/components/admin/FormAddCourse';
import AdminLayout from '@/layouts/admin';

const AddCourse: React.FC = () => {
	return (
		<AdminLayout>
			<AddCourseForm />
		</AdminLayout>
	);
};

export default AddCourse;
