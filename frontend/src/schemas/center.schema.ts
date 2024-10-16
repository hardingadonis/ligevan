import { Course } from '@/schemas/course.schema';
import { Voucher } from '@/schemas/voucher.schema';
import { Teacher } from '@/schemas/teacher.schema';
import { Class } from '@/schemas/class.schema';

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
