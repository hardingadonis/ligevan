import React from 'react';
import { useParams } from 'react-router-dom';

import DetailOfCenter from '@/components/admin/DetailOfDetail';
import AdminLayout from '@/layouts/admin';

const CenterDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return <div>No center ID provided</div>;
	}

	return (
		<AdminLayout>
			<DetailOfCenter />
		</AdminLayout>
	);
};

export default CenterDetail;
