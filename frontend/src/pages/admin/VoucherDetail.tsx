import React from 'react';

import VoucherDetail from '@/components/admin/VoucherDetail';
import AdminLayout from '@/layouts/admin';

const AdminVoucherDetail: React.FC = () => {
	return (
		<AdminLayout>
			<VoucherDetail />
		</AdminLayout>
	);
};

export default AdminVoucherDetail;
