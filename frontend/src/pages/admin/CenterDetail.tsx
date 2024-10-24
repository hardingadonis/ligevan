import React from 'react';
import { useParams } from 'react-router-dom';

import DetailOfCenter from '@/components/admin/CenterDetail';
import AdminLayout from '@/layouts/admin';

const CenterDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return <div>Không cung cấp ID trung tâm</div>;
	}

	return (
		<AdminLayout>
			<DetailOfCenter />
		</AdminLayout>
	);
};

export default CenterDetail;
