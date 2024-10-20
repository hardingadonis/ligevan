import DetailStudent from '@/components/student/DetailStudent';
import StudentLayoutWithSidebar from '@/layouts/student/student.haveSidebar';

const StudentProfile: React.FC = () => {
	return (
		<StudentLayoutWithSidebar>
			<DetailStudent />
		</StudentLayoutWithSidebar>
	);
};

export default StudentProfile;
