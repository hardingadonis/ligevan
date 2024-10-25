import React from 'react';

import VoucherForm from '@/components/admin/FormEditVoucher';
import AdminLayout from '@/layouts/admin';

const EditVoucherPage: React.FC = () => {
	return (
		<AdminLayout>
			<VoucherForm />
		</AdminLayout>
	);
};

export default EditVoucherPage;
