import StudentRegister from '@/components/student/StudentRegister';
import StudentLayoutNoSidebar from '@/layouts/student/student.noSidebar';

const StudentRegisterPage: React.FC = () => {
	return (
		<StudentLayoutNoSidebar>
			<StudentRegister />
		</StudentLayoutNoSidebar>
	);
};

export default StudentRegisterPage;
