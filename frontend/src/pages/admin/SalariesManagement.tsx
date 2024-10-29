import React from 'react';

import ListSalaries from '@/components/admin/ListSalaries';
import AdminLayout from '@/layouts/admin';

const AdminSalariesManagement: React.FC = () => {
	return (
		<AdminLayout>
			<ListSalaries />
		</AdminLayout>
	);
};

export default AdminSalariesManagement;
