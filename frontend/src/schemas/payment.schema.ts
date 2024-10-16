import { Class } from '@/schemas/class.schema';
import { Course } from '@/schemas/course.schema';
import { Student } from '@/schemas/student.schema';
import { Voucher } from '@/schemas/voucher.schema';

export interface Payment {
	_id: string;
	student: Student;
	course: Course;
	class: Class;
	voucher: Voucher;
	originPrice: number;
	finalPrice: number;
	method: 'vn-pay' | 'momo' | 'zalo-pay';
	createdAt?: Date;
	updatedAt?: Date;
}
