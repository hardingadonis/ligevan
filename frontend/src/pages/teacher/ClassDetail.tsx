import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// Import useParams
import TeacherLayout from '@/layouts/teacher';
import {
	selectEmail,
	selectToken,
	setAvatar,
	setFullName,
} from '@/slices/teacher';
import { apiBaseUrl } from '@/utils/apiBase';

import ListStudent from './ListStudent';

const ClassDetail: React.FC = () => {
	const email = useSelector(selectEmail);
	const token = useSelector(selectToken);
	const [isMounted, setIsMounted] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id: classID } = useParams<{ id: string }>(); // Lấy classID từ URL

	useEffect(() => {
		if (!token) {
			navigate('../teacher/login');
		}

		async function fetchMyAPI() {
			// Lấy thông tin giáo viên
			const responseAvatar = await axios.get(
				apiBaseUrl + `/api/teachers/email/${email}`,
			);
			if (responseAvatar.data.avatar && responseAvatar.data.fullName) {
				dispatch(setAvatar(responseAvatar.data.avatar));
				dispatch(setFullName(responseAvatar.data.fullName));
			}

			// // Có thể sử dụng classID để lấy thông tin lớp học nếu cần
			// if (classID) {
			// const responseClass = await axios.get(
			// 	apiBaseUrl + `/api/classes/${classID}`
			// );
			// 	// Xử lý dữ liệu lớp học (responseClass.data)
			// 	// console.log("Check" + responseClass.data);
			// 	// console.log("Class data (formatted):", JSON.stringify(responseClass.data, null, 2));
			// }
		}
		fetchMyAPI();
		setIsMounted(true);
	}, [token, email, classID, dispatch, navigate]);

	if (!isMounted) {
		return null;
	} else {
		return (
			<TeacherLayout>
				{/* Truyền classID vào component Detail nếu cần */}
				<ListStudent classID={classID} />
			</TeacherLayout>
		);
	}
};

export default ClassDetail;
