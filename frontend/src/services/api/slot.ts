import axios from 'axios';

import { Class } from '@/schemas/class.schema';
import { NewSlot, Slot } from '@/schemas/slot.schema';
import { getClassById } from '@/services/api/class';
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

export const getSlotById = async (id: string): Promise<Slot> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/slots/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching slot by id:', error);
		throw error;
	}
};

export const getStudentsInClassBySlotId = async (slotId: string) => {
	try {
		const slot = await getSlotById(slotId);
		const classDetails = await getClassById(slot.class._id);
		return classDetails.students;
	} catch (error) {
		console.error('Error fetching students in slot class:', error);
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
	teacherEmail?: string,
	centerId?: string,
	courseId?: string,
): Promise<Slot[]> => {
	try {
		let slots: Slot[];

		if (teacherEmail) {
			slots = await getSlotsByTeacherEmail(teacherEmail);
		} else {
			slots = await getAllSlot();
		}

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

export const createSlot = async (slot: NewSlot): Promise<string> => {
	try {
		const response = await axios.post(`${apiBaseUrl}/api/slots`, slot);
		const createdSlot: Slot = response.data;
		return createdSlot._id;
	} catch (error) {
		console.error('Error creating slot:', error);
		throw error;
	}
};

export const updateSlot = async (slot: NewSlot, id: string): Promise<void> => {
	try {
		await axios.put(`${apiBaseUrl}/api/slots/${id}`, slot);
	} catch (error) {
		console.error('Error updating slot:', error);
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

		const slotIds: string[] = classes.flatMap(
			(classItem) => classItem.slots?.map((slot) => slot.toString()) || [],
		);

		const studentSlots: Slot[] = await Promise.all(
			slotIds.map(async (slotId) => await getSlotById(slotId)),
		);

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

export const findSlotsInRange = async (
	classId: string,
	start: Date,
	end: Date,
) => {
	try {
		const response = await axios.post(
			`${apiBaseUrl}/api/slots/find-list-slot`,
			{
				classId,
				start,
				end,
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error finding slots in range:', error);
		throw error;
	}
};

export const getSlotByClass = async (classId: string): Promise<Slot[]> => {
	try {
		const classData = await getClassById(classId);
		console.log('classData:', classData);
		const slotPromises = (classData.slots ?? []).map((slot: Slot) =>
			getSlotById(slot._id),
		);
		console.log('slotPromises:', slotPromises);
		const slots = await Promise.all(slotPromises);
		return slots;
	} catch (error) {
		console.error('Error fetching slots by class:', error);
		throw error;
	}
};
