import React from 'react';

import ListTeacherOfCenter from '@/components/admin/ListTeacherOfCenter';
import AdminLayout from '@/layouts/admin';

const ListTeacher: React.FC = () => {
	return (
		<AdminLayout>
			<ListTeacherOfCenter />
		</AdminLayout>
	);
};

export default ListTeacher;
