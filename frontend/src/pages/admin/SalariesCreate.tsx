import React from 'react';

import FormSalariesCalculate from '@/components/admin/FormSalariesCalculate';
import AdminLayout from '@/layouts/admin';

const AdminSalariesManagement: React.FC = () => {
	return (
		<AdminLayout>
			<FormSalariesCalculate />
		</AdminLayout>
	);
};

export default AdminSalariesManagement;
