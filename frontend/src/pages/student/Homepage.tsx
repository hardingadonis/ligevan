import React, { useState } from 'react';

import ListCourse from '@/components/student/ListCourse';
import StudentLayoutNoSidebar from '@/layouts/student/student.noSidebar';
import { Center } from '@/schemas/center.schema';

const HomepageStudent: React.FC = () => {
	const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);

	return (
		<StudentLayoutNoSidebar onSelectCenter={setSelectedCenter}>
			<ListCourse selectedCenter={selectedCenter} />
		</StudentLayoutNoSidebar>
	);
};

export default HomepageStudent;
