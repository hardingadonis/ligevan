import React from 'react';
import { useParams } from 'react-router-dom';

import CourseDetailOfCenter from '@/components/admin/CourseDetailOfCenter';
import AdminLayout from '@/layouts/admin';

const CenterDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return <div>Không cung cấp ID khóa học</div>;
	}

	return (
		<AdminLayout>
			<CourseDetailOfCenter />
		</AdminLayout>
	);
};

export default CenterDetail;
