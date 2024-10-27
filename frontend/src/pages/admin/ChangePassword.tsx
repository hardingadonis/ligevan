import React from 'react';

import FormChangePassword from '@/components/admin/FormChangePassword';
import AdminLayout from '@/layouts/admin';

const AdminChangePassword: React.FC = () => {
	return (
		<AdminLayout showSidebar={false}>
			<FormChangePassword />
		</AdminLayout>
	);
};

export default AdminChangePassword;
