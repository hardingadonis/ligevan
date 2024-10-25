import { Col, Row } from 'antd';
import React from 'react';

import FormUpdate from '@/components/teacher/FormUpdateProfile';
import TeacherLayout from '@/layouts/teacher';

const EditProfileTeacher: React.FC = () => {
	return (
		<TeacherLayout>
			<Row style={{ padding: '20px' }}>
				<Col span={24}>
					<FormUpdate />
				</Col>
			</Row>
		</TeacherLayout>
	);
};

export default EditProfileTeacher;
