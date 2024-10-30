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

export interface CalculateSalary {
	percent: number;
	teachers: string[];
	start: string;
	end: string;
}
