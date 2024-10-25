import React from 'react';

import ClassDetailOfCenter from '@/components/admin/ClassDetailOfCenter';
import AdminLayout from '@/layouts/admin';

const ClassDetailForAdmin: React.FC = () => {
	return (
		<AdminLayout>
			<ClassDetailOfCenter />
		</AdminLayout>
	);
};

export default ClassDetailForAdmin;
