import React from 'react';
import { useParams } from 'react-router-dom';

import CourseDetail from '@/components/admin/CourseDetail';
import AdminLayout from '@/layouts/admin';

const CenterDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return <div>Không cung cấp ID khóa học</div>;
	}

	return (
		<AdminLayout>
			<CourseDetail />
		</AdminLayout>
	);
};

export default CenterDetail;
