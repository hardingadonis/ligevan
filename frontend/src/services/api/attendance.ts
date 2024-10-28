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
