import React from 'react';

import VoucherForm from '@/components/admin/FormCreateVoucher';
import AdminLayout from '@/layouts/admin';

const CreateVoucherPage: React.FC = () => {
	return (
		<AdminLayout>
			<VoucherForm />
		</AdminLayout>
	);
};

export default CreateVoucherPage;
