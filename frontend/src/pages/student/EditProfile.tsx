import { Col, Row } from 'antd';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import FormUpdate from '@/components/student/FormUpdateProfile';
import StudentLayoutWithSidebar from '@/layouts/student/student.haveSidebar';

const EditProfileStudent: React.FC = () => {
	return (
		<StudentLayoutWithSidebar>
			<Row>
				<Col span={2}>
					<ButtonGoBack />
				</Col>
				<Col span={22}>
					<FormUpdate />
				</Col>
			</Row>
		</StudentLayoutWithSidebar>
	);
};

export default EditProfileStudent;
