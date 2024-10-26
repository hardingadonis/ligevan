import { Layout, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Footer from '@/components/commons/Footer';
import Header from '@/components/commons/Header';
import ChangePasswordForm from '@/components/teacher/ChangePasswordForm';
import TeacherDropdown from '@/components/teacher/TeacherDropdown';
import {
	selectEmail,
	selectToken,
	setAvatar,
	setFullName,
} from '@/slices/teacher';
import { apiBaseUrl } from '@/utils/apiBase';

const { Content } = Layout;

const ChangePasswordPage: React.FC = () => {
	const email = useSelector(selectEmail);
	const token = useSelector(selectToken);
	const [avatar, setAvatarState] = useState<string | undefined>();
	const [fullName, setFullNameState] = useState<string | undefined>();
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate('../teacher/login');
			return;
		}

		async function fetchTeacherData() {
			try {
				const response = await axios.get(
					`${apiBaseUrl}/api/teachers/email/${email}`,
				);
				const { avatar, fullName } = response.data;

				if (avatar && fullName) {
					dispatch(setAvatar(avatar));
					dispatch(setFullName(fullName));
					setAvatarState(avatar);
					setFullNameState(fullName);
				}
			} catch (error) {
				console.error('Failed to load teacher data:', error);
			} finally {
				setLoading(false);
			}
		}

		fetchTeacherData();
	}, [token, email, dispatch, navigate]);

	if (loading) {
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Header />
				<Content>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '100vh',
						}}
					>
						<Spin size="large" />
					</div>
				</Content>
				<Footer />
			</Layout>
		);
	}

	const rightComponent = (
		<TeacherDropdown
			avatarUrl={avatar || ''}
			userFullName={fullName || 'Teacher'}
		/>
	);

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Header rightComponent={rightComponent} />
			<Content style={{ padding: '20px' }}>
				<ChangePasswordForm />
			</Content>
			<Footer />
		</Layout>
	);
};

export default ChangePasswordPage;
