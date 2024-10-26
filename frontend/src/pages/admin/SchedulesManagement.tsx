import React from 'react';

import SetupSchedules from '@/components/admin/SetupSchedules';
import AdminLayout from '@/layouts/admin';

const AdminSchedulesManagement: React.FC = () => {
	return (
		<AdminLayout>
			<SetupSchedules />
		</AdminLayout>
	);
};

export default AdminSchedulesManagement;
