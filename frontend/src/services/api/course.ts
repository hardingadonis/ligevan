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

export const getCourseById = async (id: string): Promise<Course> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/courses/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching course detail:', error);
		throw error;
	}
};

export const deleteCourse = async (id: string): Promise<void> => {
	try {
		await axios.delete(`${apiBaseUrl}/api/courses/${id}`);
	} catch (error) {
		console.error('Error deleting voucher:', error);
		throw error;
	}
};

export const updateCourse = async (
	id: string,
	course: Partial<Course>,
): Promise<void> => {
	try {
		await axios.put(`${apiBaseUrl}/api/courses/${id}`, course);
	} catch (error) {
		console.error('Error updating course:', error);
		throw error;
	}
};
