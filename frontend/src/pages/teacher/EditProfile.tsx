import { Col, Row, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FormUpdate from '@/components/teacher/FormUpdateProfile';
import TeacherLayout from '@/layouts/teacher';
import {
	selectEmail,
	selectToken,
	setAvatar,
	setFullName,
} from '@/slices/teacher';
import { apiBaseUrl } from '@/utils/apiBase';

const EditProfileTeacher: React.FC = () => {
	const email = useSelector(selectEmail);
	const token = useSelector(selectToken);
	const [isMounted, setIsMounted] = useState(false);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate('../teacher/login');
		}

		async function fetchTeacherData() {
			try {
				const response = await axios.get(
					`${apiBaseUrl}/api/teachers/email/${email}`,
				);
				if (response.data.avatar && response.data.fullName) {
					dispatch(setAvatar(response.data.avatar));
					dispatch(setFullName(response.data.fullName));
				}
			} catch (error) {
				console.error('Failed to load teacher data:', error);
			} finally {
				setLoading(false);
				setIsMounted(true);
			}
		}

		fetchTeacherData();
	}, [token, email, dispatch, navigate]);

	if (loading) {
		return (
			<TeacherLayout>
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
			</TeacherLayout>
		);
	}

	if (!isMounted) {
		return null;
	}

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
