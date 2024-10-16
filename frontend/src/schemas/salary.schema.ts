import { Teacher } from '@/schemas/teacher.schema';

export interface Salary {
	_id: string;
	teacher: Teacher;
	start: Date;
	end: Date;
	finalSalary: number;
	createdAt?: Date;
	updatedAt?: Date;
}
