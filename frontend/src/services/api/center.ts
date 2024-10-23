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

export const createCenter = async (center: Center): Promise<void> => {
	try {
		await axios.post(`${apiBaseUrl}/api/centers`, center);
	} catch (error) {
		console.error('Error creating center:', error);
		throw error;
	}
};
