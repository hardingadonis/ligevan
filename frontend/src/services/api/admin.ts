import axios from 'axios';

import { ChangePasswordFormValues } from '@/components/admin/FormChangePassword';
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

export const adminChangePassword = async (
	values: ChangePasswordFormValues,
): Promise<void> => {
	try {
		await axios.put(
			`${apiBaseUrl}/api/admins/${values.username}/change-password`,
			{
				currentPassword: values.currentPassword,
				newPassword: values.newPassword,
			},
		);
	} catch (error) {
		console.error('Error changing password:', error);
		throw error;
	}
};
