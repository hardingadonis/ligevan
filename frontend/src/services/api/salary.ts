import axios from 'axios';

import { Salary } from '@/schemas/salary.schema';
import { apiBaseUrl } from '@/utils/apiBase';

export const getAllSalary = async (): Promise<Salary[]> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/salaries`);
		return response.data;
	} catch (error) {
		console.error('Error fetching slots:', error);
		throw error;
	}
};

export const deleteSalary = async (id: string): Promise<void> => {
	try {
		await axios.delete(`${apiBaseUrl}/api/salaries/${id}`);
	} catch (error) {
		console.error('Error deleting salary:', error);
		throw error;
	}
};
