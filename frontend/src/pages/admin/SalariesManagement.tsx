import React from 'react';

import SalariesManagement from '@/components/admin/SalariesManagement';
import AdminLayout from '@/layouts/admin';

const AdminSalariesManagement: React.FC = () => {
	return (
		<AdminLayout>
			<SalariesManagement />
		</AdminLayout>
	);
};

export default AdminSalariesManagement;
