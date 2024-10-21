import axios from 'axios';

import { apiBaseUrl } from '@/utils/apiBase';

interface LoginResponse {
	accessToken: string;
}

interface LoginCredentials {
	username: string;
	password: string;
}

export const fetchLogin = async (
	credentials: LoginCredentials,
): Promise<LoginResponse> => {
	try {
		const response = await axios.post(
			`${apiBaseUrl}/api/auth/admin/login`,
			credentials,
		);

		if (
			response.data &&
			typeof response.data === 'object' &&
			'access_token' in response.data
		) {
			return {
				accessToken: response.data.access_token,
			};
		}

		throw new Error('Invalid response format');
	} catch (error) {
		console.error('Error logging in:', error);
		if (axios.isAxiosError(error) && error.response) {
			console.error('Server response:', error.response.data);
		}
		throw error;
	}
};
