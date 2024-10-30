import axios from 'axios';

import { Class } from '@/schemas/class.schema';
import { getStudentByEmail } from '@/services/api/student';
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

export const getAllTeacherByCourseId = async (courseId: string) => {
	try {
		const response = await axios.get(
			`${apiBaseUrl}/api/classes/teachers/${courseId}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching teachers:', error);
		throw error;
	}
};

export const getClassesByStudentEmail = async (
	email: string,
): Promise<Class[]> => {
	try {
		const student = await getStudentByEmail(email);
		if (!student) {
			throw new Error('Student not found');
		}

		const allClasses = await getAllClasses();
		const studentClasses = allClasses.filter((classItem) =>
			classItem.students?.some((s) => s._id === student._id),
		);

		return studentClasses;
	} catch (error) {
		console.error('Error fetching classes by student email:', error);
		throw error;
	}
};
