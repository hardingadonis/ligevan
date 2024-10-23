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
		console.error('Error fetching center detail:', error);
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


