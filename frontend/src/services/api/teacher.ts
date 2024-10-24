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

export const deleteTeacher = async (id: string): Promise<void> => {
	try {
		await axios.delete(`${apiBaseUrl}/api/teachers/${id}`);
	} catch (error) {
		console.error('Error deleting teacher:', error);
		throw error;
	}
};
