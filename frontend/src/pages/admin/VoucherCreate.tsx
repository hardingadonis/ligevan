import React from 'react';
import { useNavigate } from 'react-router-dom';

import VoucherForm from '@/components/admin/VoucherForm';
import AdminLayout from '@/layouts/admin';

const CreateVoucherPage: React.FC = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate('/admin/Vouchers');
	};

	return (
		<AdminLayout>
			<div
				style={{
					maxWidth: 800,
					margin: '0 auto',
					padding: '24px',
				}}
			>
				<VoucherForm onSuccess={handleGoBack} />
			</div>
		</AdminLayout>
	);
};

export default CreateVoucherPage;
