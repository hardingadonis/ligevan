import ListSalaries from '@/components/admin/ListSalaries';
import TeacherLayout from '@/layouts/teacher';

const ListSalariesPage: React.FC = () => {
	return (
		<TeacherLayout>
			<ListSalaries />
		</TeacherLayout>
	);
};

export default ListSalariesPage;
