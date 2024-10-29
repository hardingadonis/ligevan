import React from 'react';

import VoucherDetailOfCenter from '@/components/admin/VoucherDetailOfCenter';
import AdminLayout from '@/layouts/admin';

const AdminVoucherDetail: React.FC = () => {
	return (
		<AdminLayout>
			<VoucherDetailOfCenter />
		</AdminLayout>
	);
};

export default AdminVoucherDetail;
