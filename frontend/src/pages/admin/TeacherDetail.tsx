import React from 'react';

import TeacherDetailOfCenter from '@/components/admin/TeacherDetailOfCenter';
import AdminLayout from '@/layouts/admin';

const TeacherDetail: React.FC = () => {
	return (
		<AdminLayout>
			<TeacherDetailOfCenter />
		</AdminLayout>
	);
};

export default TeacherDetail;
