import React from 'react';
import { useParams } from 'react-router-dom';

import DetailOfCourse from '@/components/admin/DetailOfCourse';
import AdminLayout from '@/layouts/admin';

const CenterDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return <div>Không cung cấp ID khóa học</div>;
	}

	return (
		<AdminLayout>
			<DetailOfCourse />
		</AdminLayout>
	);
};

export default CenterDetail;
