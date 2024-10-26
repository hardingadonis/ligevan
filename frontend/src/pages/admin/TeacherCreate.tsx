import React from 'react';

import TeacherForm from '@/components/admin/FormCreateTeacher';
import AdminLayout from '@/layouts/admin';

const TeacherCreate: React.FC = () => {
	return (
		<AdminLayout>
			<TeacherForm />
		</AdminLayout>
	);
};

export default TeacherCreate;
