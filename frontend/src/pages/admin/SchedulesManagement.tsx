import '../../assets/styles/schedule.css';
import { registerLicense } from '@syncfusion/ej2-base';
import React from 'react';

import SetupSchedules from '@/components/admin/SetupSchedules';
import AdminLayout from '@/layouts/admin';

registerLicense(`${import.meta.env.VITE_EJ2_LICENSE_KEY}`);

const AdminSchedulesManagement: React.FC = () => {
	return (
		<AdminLayout>
			<SetupSchedules />
		</AdminLayout>
	);
};

export default AdminSchedulesManagement;
