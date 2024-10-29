import axios from 'axios';

import { CheckAttendance } from '@/schemas/attendance.schema';
import { apiBaseUrl } from '@/utils/apiBase';

export const checkAttendances = async (
	slotId: string,
	attendances: CheckAttendance[],
) => {
	try {
		const response = await axios.put(
			`${apiBaseUrl}/api/attendances/check-attendances/${slotId}`,
			attendances,
		);

		return response.data;
	} catch (error) {
		console.error('Error fetching admin details:', error);
		throw error;
	}
};

export const createAllAttendance = async (
	slotId: string,
	students: string[],
) => {
	try {
		const response = await axios.post(
			`${apiBaseUrl}/api/attendances/create-all/${slotId}`,
			students,
		);

		return response.data;
	} catch (error) {
		console.error('Error creating slot:', error);
		throw error;
	}
};
