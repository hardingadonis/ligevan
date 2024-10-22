import ListClass from '@/components/student/ListClass';
import StudentLayoutWithSidebar from '@/layouts/student/student.haveSidebar';

const StudentClassList: React.FC = () => {
	return (
		<StudentLayoutWithSidebar>
			<ListClass />
		</StudentLayoutWithSidebar>
	);
};

export default StudentClassList;
