import React from 'react';

import ListClassrOfCenter from '@/components/admin/ListClassOfCenter';
import AdminLayout from '@/layouts/admin';

const ListClass: React.FC = () => {
	return (
		<AdminLayout>
			<ListClassrOfCenter />
		</AdminLayout>
	);
};

export default ListClass;
