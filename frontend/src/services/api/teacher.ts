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
