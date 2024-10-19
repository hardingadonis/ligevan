import { selectToken, setAvatar, setFullName } from '../../slices/teacher';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import '@/assets/styles/global.css';
import TeacherLayout from '@/layouts/teacher';
import { apiBaseUrl } from '@/utils/apiBase';

const HomePageTeacher: React.FC = () => {
	const token = localStorage.getItem('teacherToken');
	const email = localStorage.getItem('teacherEmail');

	const navigate = useNavigate();
	const [isMounted, setIsMounted] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!token) {
			navigate('../teacher/login');
		}

		async function fetchMyAPI() {
			const responseAvatar = await axios.get(
				apiBaseUrl + `/api/teachers/email/${email}`,
			);

			if (responseAvatar.data.avatar && responseAvatar.data.fullName) {
				dispatch(setAvatar(responseAvatar.data.avatar));
				dispatch(setFullName(responseAvatar.data.fullName));
			}
		}
		fetchMyAPI();
		setIsMounted(true);
	}, [token, email, dispatch, navigate]);

	if (!isMounted) {
		return null;
	} else return <TeacherLayout children={undefined}></TeacherLayout>;
};

export default HomePageTeacher;
