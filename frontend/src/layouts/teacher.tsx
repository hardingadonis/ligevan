import { FloatButton, Layout } from 'antd';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import Footer from '@/components/commons/Footer';
import Header from '@/components/commons/Header';
import Sidebar from '@/components/teacher/Sidebar';
import TeacherDropdown from '@/components/teacher/TeacherDropdown';
import { selectAvatar, selectFullName } from '@/slices/teacher';

const { Content } = Layout;

interface TeacherLayoutProps {
	children: ReactNode;
}

const TeacherLayout: React.FC<TeacherLayoutProps> = ({ children }) => {
	const avatar = useSelector(selectAvatar) ?? undefined;
	const userFullName = useSelector(selectFullName) ?? undefined;

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Header
				rightComponent={
					<TeacherDropdown
						avatarUrl={avatar ?? ''}
						userFullName={userFullName ?? ''}
					/>
				}
			/>
			<Layout>
				<Sidebar />
				<Layout>
					<Content
						style={{
							padding: 24,
							minHeight: 280,
							background: '#fff',
						}}
					>
						{children}
					</Content>
				</Layout>
				<Footer />
			</Layout>
			<FloatButton.BackTop />
		</Layout>
	);
};

export default TeacherLayout;
