import axios from 'axios';

import { Center } from '@/schemas/center.schema';
import { apiBaseUrl } from '@/utils/apiBase';

export const getAllCenter = async (): Promise<Center[]> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/centers`);
		return response.data;
	} catch (error) {
		console.error('Error fetching centers:', error);
		throw error;
	}
};

export const getCenterById = async (id: string): Promise<Center> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/centers/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching center:', error);
		throw error;
	}
};

export const updateCenter = async (
	id: string,
	updateData: Partial<Center>,
): Promise<Center> => {
	try {
		const response = await axios.put(
			`${apiBaseUrl}/api/centers/${id}`,
			updateData,
		);
		return response.data;
	} catch (error) {
		console.error('Error updating center:', error);
		throw error;
	}
};

export const deleteCenter = async (id: string): Promise<void> => {
	try {
		await axios.delete(`${apiBaseUrl}/api/centers/${id}`);
	} catch (error) {
		console.error('Error deleting center:', error);
		throw error;
	}
};

export const createCenter = async (center: Center): Promise<void> => {
	try {
		await axios.post(`${apiBaseUrl}/api/centers`, center);
	} catch (error) {
		console.error('Error creating center:', error);
		throw error;
	}
};
