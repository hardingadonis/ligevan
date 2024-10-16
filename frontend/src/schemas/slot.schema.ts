import { Class } from "@/schemas/class.schema";
import { Attendance } from "@/schemas/attendance.schema";

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
