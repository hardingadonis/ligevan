import PaymentHistory from '@/components/student/PaymentHistory';
import StudentLayoutWithSidebar from '@/layouts/student/student.haveSidebar';

const StudentPaymentHistory: React.FC = () => {
	return (
		<StudentLayoutWithSidebar>
			<PaymentHistory />
		</StudentLayoutWithSidebar>
	);
};

export default StudentPaymentHistory;
