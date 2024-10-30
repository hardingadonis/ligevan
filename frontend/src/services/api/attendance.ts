import axios from 'axios';

import { CheckAttendance } from '@/schemas/attendance.schema';
import { getSlotById } from '@/services/api/slot';
import { getStudentByEmail } from '@/services/api/student';
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

export const checkAttendanceStatus = async (
	studentEmail: string,
	slotId: string,
): Promise<'attended' | 'absent' | 'not-yet' | null> => {
	const slot = await getSlotById(slotId);
	if (!slot?.attendances) {
		return null;
	}
	const student = await getStudentByEmail(studentEmail);
	const attendance = slot.attendances.find(
		(att) => att.student._id === student._id,
	);
	return attendance ? attendance.status : null;
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
