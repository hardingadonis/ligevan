import axios from 'axios';

import { Admin } from '@/schemas/admin.schema';
import { apiBaseUrl } from '@/utils/apiBase';

export const getAdminByUsername = async (username: string): Promise<Admin> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/admins/${username}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching admin details:', error);
		throw error;
	}
};
