import FormUpdate from '@/components/student/FormUpdateProfile';
import StudentLayoutWithSidebar from '@/layouts/student/student.haveSidebar';

const EditProfileStudent: React.FC = () => {
	return (
		<StudentLayoutWithSidebar>
			<FormUpdate />
		</StudentLayoutWithSidebar>
	);
};

export default EditProfileStudent;
