import React from 'react';
import { useNavigate } from 'react-router-dom';

import CenterForm from '@/components/admin/FormCreateCenter';
import AdminLayout from '@/layouts/admin';

const CreateCenterPage: React.FC = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate('/admin/centers');
	};

	return (
		<AdminLayout>
			<CenterForm onSuccess={handleGoBack} />
		</AdminLayout>
	);
};

export default CreateCenterPage;
