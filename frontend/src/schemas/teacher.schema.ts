import { Center } from '@/schemas/center.schema';
import { Salary } from '@/schemas/salary.schema';

export interface Teacher {
	_id: string;
	fullName: string;
	email: string;
	phone: string;
	address: string;
	avatar: string;
	gender: 'male' | 'female';
	dob: Date;
	salaries?: Salary[];
	center: Center;
	isDeleted?: boolean;
	createAt?: Date;
	updateAt?: Date;
}
