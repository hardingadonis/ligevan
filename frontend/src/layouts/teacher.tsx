import { Layout } from 'antd';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import Footer from '@/components/commons/Footer';
import Header from '@/components/commons/Header';
import Sidebar from '@/components/teacher/Sidebar';
import { selectAvatar } from '@/slices/teacher';

const { Content } = Layout;

interface TeacherLayoutProps {
	children: ReactNode;
}

const TeacherLayout: React.FC<TeacherLayoutProps> = ({ children }) => {
	const avatar = useSelector(selectAvatar) ?? undefined;

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Header avatarUrl={avatar} />
			<Layout>
				<Sidebar />
				<Layout style={{ marginLeft: 200 }}>
					{' '}
					<Content
						style={{
							padding: 24,
							minHeight: 280,
							background: '#fff',
						}}
					>
						{children}
					</Content>
					<Footer />
				</Layout>
			</Layout>
		</Layout>
	);
};

export default TeacherLayout;
