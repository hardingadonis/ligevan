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

export const updateStudent = async (
	id: string,
	updateData: Partial<Student>,
): Promise<Student> => {
	try {
		const response = await axios.put(
			`${apiBaseUrl}/api/students/${id}`,
			updateData,
		);
		return response.data;
	} catch (error) {
		console.error('Error updating student:', error);
		throw error;
	}
};

export const getStudentByID = async (id: string): Promise<Student> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/students/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching student:', error);
		throw error;
	}
};
