import React from 'react';

import ListClassOfCenter from '@/components/admin/ListClassOfCenter';
import AdminLayout from '@/layouts/admin';

const ListClass: React.FC = () => {
	return (
		<AdminLayout>
			<ListClassOfCenter />
		</AdminLayout>
	);
};

export default ListClass;
