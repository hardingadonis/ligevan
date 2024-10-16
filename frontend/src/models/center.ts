import { Course } from '@/models/course';
import { Voucher } from '@/models/voucher';

interface Center {
  _id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  courses?: Course[];
  vouchers?: Voucher[];
  teachers?: string[];
}

export type { Center };
