import { Layout, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Footer from '@/components/commons/Footer';
import Header from '@/components/commons/Header';
import ChangePasswordForm from '@/components/teacher/ChangePasswordForm';
import TeacherDropdown from '@/components/teacher/TeacherDropdown';
import {
	selectAvatar,
	selectEmail,
	selectFullName,
	selectToken,
	setAvatar,
	setFullName,
} from '@/slices/teacher';
import { apiBaseUrl } from '@/utils/apiBase';

const { Content } = Layout;

const ChangePasswordPage: React.FC = () => {
	const email = useSelector(selectEmail);
	const token = useSelector(selectToken);
	const avatar = useSelector(selectAvatar);
	const fullName = useSelector(selectFullName);
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
				}
			} catch (error) {
				console.error('Failed to load teacher data:', error);
			}
		}

		fetchTeacherData();
	}, [token, email, dispatch, navigate]);

	if (!token) {
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
			avatarUrl={avatar ?? ''}
			userFullName={fullName ?? 'Teacher'}
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
