import React from 'react';
import { useParams } from 'react-router-dom';

import DetailOfCenter from '@/components/admin/DetailOfDetail';

const CenterDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return <div>No center ID provided</div>;
	}

	return (
		<div>
			<DetailOfCenter />
		</div>
	);
};

export default CenterDetail;
