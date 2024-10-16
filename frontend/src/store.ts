import { configureStore } from '@reduxjs/toolkit';

import adminReducer from '@/slices/admin';
import attendanceReducer from '@/slices/attendance';
import centerReducer from '@/slices/center';
import classReducer from '@/slices/class';
import courseReducer from '@/slices/course';
import paymentReducer from '@/slices/payment';
import salaryReducer from '@/slices/salary';
import slotReducer from '@/slices/slot';
import studentReducer from '@/slices/student';
import teacherReducer from '@/slices/teacher';
import voucherReducer from '@/slices/voucher';

export default configureStore({
	reducer: {
		admins: adminReducer,
		attendances: attendanceReducer,
		centers: centerReducer,
		classes: classReducer,
		courses: courseReducer,
		payments: paymentReducer,
		salaries: salaryReducer,
		slots: slotReducer,
		students: studentReducer,
		teachers: teacherReducer,
		vouchers: voucherReducer,
	},
});
