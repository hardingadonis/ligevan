import React from 'react';

import AddVoucherForm from '@/components/admin/FormAddVoucher';
import AdminLayout from '@/layouts/admin';

const AddVoucher: React.FC = () => {
	return (
		<AdminLayout>
			<AddVoucherForm />
		</AdminLayout>
	);
};

export default AddVoucher;
