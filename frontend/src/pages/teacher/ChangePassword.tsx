import React from 'react';

import ChangePasswordForm from '@/components/teacher/ChangePasswordForm';
import TeacherLayout from '@/layouts/teacher';

const ChangePasswordPage: React.FC = () => {
	return (
		<TeacherLayout>
			<ChangePasswordForm />
		</TeacherLayout>
	);
};

export default ChangePasswordPage;
