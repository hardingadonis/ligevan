import { Class } from '@/schemas/class.schema';
import { Payment } from '@/schemas/payment.schema';

export interface Student {
	_id: string;
	fullName: string;
	email: string;
	hashedPassword: string;
	phone: string;
	address: string;
	avatar: string;
	gender: 'male' | 'female';
	dob: Date;
	classes?: Class[];
	payments?: Payment[];
	isDeleted?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
