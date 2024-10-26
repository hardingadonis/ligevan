import axios from 'axios';

import { Slot } from '@/schemas/slot.schema';
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

export const deleteTeacher = async (id: string): Promise<void> => {
	try {
		await axios.delete(`${apiBaseUrl}/api/teachers/${id}`);
	} catch (error) {
		console.error('Error deleting teacher:', error);
		throw error;
	}
};

export const getTeacherById = async (id: string): Promise<Teacher> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/teachers/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching teacher:', error);
		throw error;
	}
};

export const getTeacherBySlotId = async (slotId: string): Promise<Teacher> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/slots/${slotId}`);
		const slot: Slot = response.data;
		return getTeacherById(slot.class.teacher.toString());
	} catch (error) {
		console.error('Error fetching teacher by slot ID:', error);
		throw error;
	}
};
