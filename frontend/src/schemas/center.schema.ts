import { Class } from '@/schemas/class.schema';
import { Course } from '@/schemas/course.schema';
import { Teacher } from '@/schemas/teacher.schema';
import { Voucher } from '@/schemas/voucher.schema';

export interface Center {
	_id: string;
	name: string;
	address: string;
	phone: string;
	email: string;
	courses?: Course[];
	vouchers?: Voucher[];
	teachers?: Teacher[];
	classes?: Class[];
	isDeleted?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
