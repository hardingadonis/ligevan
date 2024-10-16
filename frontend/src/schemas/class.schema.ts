import { Center } from '@/schemas/center.schema';
import { Course } from '@/schemas/course.schema';
import { Slot } from '@/schemas/slot.schema';
import { Student } from '@/schemas/student.schema';
import { Teacher } from '@/schemas/teacher.schema';

export interface Class {
	_id: string;
	name: string;
	center: Center;
	course: Course;
	teacher: Teacher;
	students?: Student[];
	slots?: Slot[];
	isDeleted?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
