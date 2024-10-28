import { Slot } from '@/schemas/slot.schema';
import { Student } from '@/schemas/student.schema';

export interface Attendance {
	_id: string;
	student: Student;
	slot: Slot;
	status: 'attended' | 'absent' | 'not-yet';
	createdAt?: Date;
	updatedAt?: Date;
}

export interface CheckAttendance {
	student: string;
	status: string;
}
