import '../../assets/styles/scheduleStudent.css';
import { registerLicense } from '@syncfusion/ej2-base';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Schedule from '@/components/teacher/Schedule';
import TeacherLayout from '@/layouts/teacher';
import {
	selectEmail,
	selectToken,
	setAvatar,
	setFullName,
} from '@/slices/teacher';
import { apiBaseUrl } from '@/utils/apiBase';

registerLicense(`${import.meta.env.VITE_EJ2_LICENSE_KEY}`);

const ScheduleView: React.FC = () => {
	const email = useSelector(selectEmail);
	const token = useSelector(selectToken);
	const [isMounted, setIsMounted] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
	} else
		return (
			<TeacherLayout>
				<Schedule />
			</TeacherLayout>
		);
};
export default ScheduleView;
