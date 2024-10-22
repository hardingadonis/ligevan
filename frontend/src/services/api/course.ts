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

export const createCourse = async (course: Course): Promise<void> => {
	try {
		await axios.post(`${apiBaseUrl}/api/courses`, course);
	} catch (error) {
		console.error('Error creating course:', error);
		throw error;
	}
};
