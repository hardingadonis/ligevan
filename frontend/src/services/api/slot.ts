import axios from 'axios';

import { Slot } from '@/schemas/slot.schema';
import { apiBaseUrl } from '@/utils/apiBase';

export const getAllSlot = async (): Promise<Slot[]> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/slots`);
		return response.data;
	} catch (error) {
		console.error('Error fetching slots:', error);
		throw error;
	}
};

export const getSlotByTeacherEmail = async (email: string): Promise<Slot[]> => {
	try {
		const allSlots = await getAllSlot();
		const filteredSlots = allSlots.filter(
			(slot) => slot.class.teacher.email === email,
		);
		return filteredSlots;
	} catch (error) {
		console.error('Error fetching slots by teacher email:', error);
		throw error;
	}
};
