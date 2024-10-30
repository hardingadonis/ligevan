import { Attendance } from '@/schemas/attendance.schema';
import { Class } from '@/schemas/class.schema';

export interface Slot {
	_id: string;
	class: Class;
	room: string;
	start: Date;
	end: Date;
	attendances?: Attendance[];
	isDone: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface NewSlot {
	class: string;
	room: string;
	start: Date;
	end: Date;
	attendances?: Attendance[];
	isDone: boolean;
}
