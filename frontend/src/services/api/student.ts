import axios from 'axios';

import { Student } from '@/schemas/student.schema';
import { apiBaseUrl } from '@/utils/apiBase';

export const getAllStudent = async (): Promise<Student[]> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/students`);
		return response.data;
	} catch (error) {
		console.error('Error fetching students:', error);
		throw error;
	}
};

export const getStudentByEmail = async (email: string): Promise<Student> => {
	try {
		const response = await axios.get(
			`${apiBaseUrl}/api/students/email/${email}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching student:', error);
		throw error;
	}
};
