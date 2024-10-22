import { Typography } from 'antd';
import React, { useState } from 'react';

import ListCourse from '@/components/student/ListCourse';
import StudentLayoutNoSidebar from '@/layouts/student/student.noSidebar';
import { Center } from '@/schemas/center.schema';

const HomepageStudent: React.FC = () => {
	const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);

	return (
		<StudentLayoutNoSidebar onSelectCenter={setSelectedCenter}>
			<Typography.Title level={1} style={{ textAlign: 'center' }}>
				「学び、練習し、成功する」
			</Typography.Title>
			<ListCourse selectedCenter={selectedCenter} />
		</StudentLayoutNoSidebar>
	);
};

export default HomepageStudent;
