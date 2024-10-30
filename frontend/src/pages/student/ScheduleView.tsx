import '../../assets/styles/scheduleStudent.css';
import { registerLicense } from '@syncfusion/ej2-base';

import Schedule from '@/components/student/Schedule';
import StudentLayoutWithSidebar from '@/layouts/student/student.haveSidebar';

registerLicense(`${import.meta.env.VITE_EJ2_LICENSE_KEY}`);

const StudentProfile: React.FC = () => {
	return (
		<StudentLayoutWithSidebar>
			<Schedule />
		</StudentLayoutWithSidebar>
	);
};

export default StudentProfile;
