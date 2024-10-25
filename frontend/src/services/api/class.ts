import axios from 'axios';

import { Class } from '@/schemas/class.schema';
import { apiBaseUrl } from '@/utils/apiBase';

export const getClassById = async (id: string): Promise<Class> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/classes/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching class:', error);
		throw error;
	}
};

export const getAllClasses = async (): Promise<Class[]> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/classes`);
		return response.data;
	} catch (error) {
		console.error('Error fetching classes:', error);
		throw error;
	}
};
