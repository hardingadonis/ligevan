import { Student } from "@/schemas/student.schema";
import { Slot } from "@/schemas/slot.schema";

export interface Attendance {
	_id: string;
	student: Student;
	slot: Slot;
	status: 'attended' | 'absent' | 'not-yet';
	createdAt?: Date;
  updatedAt?: Date;
}
