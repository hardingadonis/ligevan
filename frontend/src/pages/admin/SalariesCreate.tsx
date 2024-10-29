import React from 'react';

import FormCalculateSalaries from '@/components/admin/FormCalculateSalaries';
import AdminLayout from '@/layouts/admin';

const AdminSalariesManagement: React.FC = () => {
	return (
		<AdminLayout>
			<FormCalculateSalaries />
		</AdminLayout>
	);
};

export default AdminSalariesManagement;
