import React, { useState } from 'react';

import ListCourse from '@/components/student/ListCourse';
import StudentLayout from '@/layouts/student';
import { Center } from '@/schemas/center.schema';

const HomepageStudent: React.FC = () => {
	const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);

	return (
		<StudentLayout onSelectCenter={setSelectedCenter}>
			<ListCourse selectedCenter={selectedCenter} />
		</StudentLayout>
	);
};

export default HomepageStudent;
