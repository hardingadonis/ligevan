import axios from 'axios';

import { Teacher } from '@/schemas/teacher.schema';
import { apiBaseUrl } from '@/utils/apiBase';

export const getAllTeacher = async (): Promise<Teacher[]> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/teachers`);
		return response.data;
	} catch (error) {
		console.error('Error fetching teachers:', error);
		throw error;
	}
};

export const getTeacherByEmail = async (email: string): Promise<Teacher> => {
	try {
		const response = await axios.get(
			`${apiBaseUrl}/api/teachers/email/${email}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching teacher:', error);
		throw error;
	}
};
