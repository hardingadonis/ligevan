import React from 'react';

import ClassForm from '@/components/admin/FormCreateClass';
import AdminLayout from '@/layouts/admin';

const ClassCreate: React.FC = () => {
	return (
		<AdminLayout>
			<ClassForm />
		</AdminLayout>
	);
};

export default ClassCreate;
