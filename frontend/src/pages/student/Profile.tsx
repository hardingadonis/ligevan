import { Col, Row } from 'antd';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import DetailStudent from '@/components/student/DetailStudent';
import StudentLayoutWithSidebar from '@/layouts/student/student.haveSidebar';

const StudentProfile: React.FC = () => {
	return (
		<StudentLayoutWithSidebar>
			<Row>
				<Col span={2}>
					<ButtonGoBack />
				</Col>
				<Col span={22}>
					<DetailStudent />
				</Col>
			</Row>
		</StudentLayoutWithSidebar>
	);
};

export default StudentProfile;
