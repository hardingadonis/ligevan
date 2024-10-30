import axios from 'axios';

import { Class } from '@/schemas/class.schema';
import { Slot } from '@/schemas/slot.schema';
import { getStudentByEmail } from '@/services/api/student';
import { getTeacherByEmail } from '@/services/api/teacher';
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

export const getSlotsByTeacherEmail = async (
	email: string,
): Promise<Slot[]> => {
	try {
		const teacher = await getTeacherByEmail(email);
		const teacherId = teacher._id;
		const allSlots = await getAllSlot();
		const teacherSlots = allSlots.filter(
			(slot) => slot.class.teacher.toString() === teacherId,
		);
		return teacherSlots;
	} catch (error) {
		console.error('Error fetching slots by teacher email:', error);
		throw error;
	}
};

export const filterSlotsforSchedule = async (
	teacherEmail: string,
	centerId?: string,
	courseId?: string,
): Promise<Slot[]> => {
	try {
		const slots = await getSlotsByTeacherEmail(teacherEmail);

		let filteredSlots = slots;
		if (centerId && centerId !== 'all') {
			filteredSlots = filteredSlots.filter(
				(slot) => slot.class.center.toString() === centerId,
			);
		}

		if (courseId && courseId !== 'all') {
			filteredSlots = filteredSlots.filter(
				(slot) => slot.class.course.toString() === courseId,
			);
		}

		return filteredSlots;
	} catch (error) {
		console.error('Error filtering slots:', error);
		throw error;
	}
};

export const getSlotsByStudentEmail = async (
	email: string,
): Promise<Slot[]> => {
	try {
		const student = await getStudentByEmail(email);

		if (!student) {
			throw new Error('No valid student found for the given email.');
		}

		const classes: Class[] = student.classes || [];

		const studentSlots: Slot[] = classes.flatMap(
			(classItem) => classItem.slots || [],
		);

		console.log('studentSlots:', studentSlots);

		return studentSlots;
	} catch (error) {
		console.error('Error fetching slots by student email:', error);
		throw error;
	}
};

export const filterSlotsForStudentSchedule = async (
	studentEmail: string,
	centerId?: string,
	courseId?: string,
): Promise<Slot[]> => {
	try {
		const slots = await getSlotsByStudentEmail(studentEmail);

		let filteredSlots = slots;

		if (centerId && centerId !== 'all') {
			filteredSlots = filteredSlots.filter(
				(slot) => slot.class.center.toString() === centerId,
			);
		}

		if (courseId && courseId !== 'all') {
			filteredSlots = filteredSlots.filter(
				(slot) => slot.class.course.toString() === courseId,
			);
		}

		return filteredSlots;
	} catch (error) {
		console.error('Error filtering slots for student:', error);
		throw error;
	}
};
