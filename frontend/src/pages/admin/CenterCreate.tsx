import React from 'react';
import { useNavigate } from 'react-router-dom';

import CenterForm from '@/components/admin/CenterForm';
import AdminLayout from '@/layouts/admin';

const CreateCenterPage: React.FC = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate('/admin/centers');
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
				<CenterForm onSuccess={handleGoBack} />
			</div>
		</AdminLayout>
	);
};

export default CreateCenterPage;
