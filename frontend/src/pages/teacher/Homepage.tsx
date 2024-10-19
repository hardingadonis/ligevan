import { selectToken } from '../../slices/teacher';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import '@/assets/styles/global.css';
import TeacherLayout from '@/layouts/teacher';

const HomePageTeacher: React.FC = () => {
	const token = useSelector(selectToken);
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate('../teacher/login');
		}
	}, [token, navigate]);

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	} else return <TeacherLayout children={undefined}></TeacherLayout>;
};

export default HomePageTeacher;
