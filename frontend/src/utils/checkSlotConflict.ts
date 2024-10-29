import { Slot } from '@/schemas/slot.schema';

export const doSlotsConflict = (slot1: Slot, slot2: Slot): boolean => {
	const start1 = new Date(slot1.start).getTime();
	const end1 = new Date(slot1.end).getTime();
	const start2 = new Date(slot2.start).getTime();
	const end2 = new Date(slot2.end).getTime();

	return start1 < end2 && end1 > start2;
};
