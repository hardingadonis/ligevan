import axios from 'axios';

import { CalculateSalary, Salary } from '@/schemas/salary.schema';
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

export const getSalaryById = async (id: string): Promise<Salary> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/salaries/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching salary:', error);
		throw error;
	}
}


export const deleteSalary = async (id: string): Promise<void> => {
	try {
		await axios.delete(`${apiBaseUrl}/api/salaries/${id}`);
	} catch (error) {
		console.error('Error deleting salary:', error);
		throw error;
	}
};

export const calculateSalary = async (
	payload: CalculateSalary,
): Promise<Salary[]> => {
	try {
		const response = await axios.post(
			`${apiBaseUrl}/api/salaries/calculate`,
			payload,
		);
		return response.data;
	} catch (error) {
		console.error('Error calculating salary:', error);
		throw error;
	}
};
