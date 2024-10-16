import { Center } from "@/schemas/center.schema";
import { Course } from "@/schemas/course.schema";
import { Teacher } from "@/schemas/teacher.schema";
import { Student } from "@/schemas/student.schema";
import { Slot } from "@/schemas/slot.schema";

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
