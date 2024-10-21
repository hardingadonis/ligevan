import React from 'react';

import ListCenters from '@/components/admin/ListCenters';
import AdminLayout from '@/layouts/admin';

const AdminCentersManagement: React.FC = () => {
	return (
		<AdminLayout>
			<ListCenters />
		</AdminLayout>
	);
};

export default AdminCentersManagement;
