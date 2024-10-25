import CourseEditForm from '@/components/admin/FormEditCourse';
import AdminLayout from '@/layouts/admin';

const CourseEdit: React.FC = () => {
	return (
		<AdminLayout>
			<CourseEditForm />
		</AdminLayout>
	);
};

export default CourseEdit;
