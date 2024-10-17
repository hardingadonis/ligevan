import axios from 'axios';

import { Course } from '@/schemas/course.schema';
import { apiBaseUrl } from '@/utils/apiBase';

export const getAllCourse = async (): Promise<Course[]> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/courses`);
		return response.data;
	} catch (error) {
		console.error('Error fetching course:', error);
		throw error;
	}
};
