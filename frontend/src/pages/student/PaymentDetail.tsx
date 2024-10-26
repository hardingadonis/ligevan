import PaymentDetail from '@/components/student/PaymentDetail';
import StudentLayoutWithSidebar from '@/layouts/student/student.haveSidebar';

const StudentPaymentHistory: React.FC = () => {
	return (
		<StudentLayoutWithSidebar>
			<PaymentDetail />
		</StudentLayoutWithSidebar>
	);
};

export default StudentPaymentHistory;
