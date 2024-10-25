import AttendencesReportForStudent from '@/components/student/AttendencesReport';
import StudentLayoutWithSidebar from '@/layouts/student/student.haveSidebar';

const AttendencesReport: React.FC = () => {
	return (
		<StudentLayoutWithSidebar>
			<AttendencesReportForStudent />
		</StudentLayoutWithSidebar>
	);
};

export default AttendencesReport;
