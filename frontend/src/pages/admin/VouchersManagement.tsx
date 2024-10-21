import React from 'react';

import ListVouchers from '@/components/admin/ListVouchers';
import AdminLayout from '@/layouts/admin';

const AdminVouchersManagement: React.FC = () => {
	return (
		<AdminLayout>
			<ListVouchers />
		</AdminLayout>
	);
};

export default AdminVouchersManagement;
