import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Student } from '@/schemas/student.schema';
import { updateStudent } from '@/services/api/student';

interface StudentState {
	student: Student | null;
	loading: boolean;
	error: string | null;
}

const initialState: StudentState = {
	student: null,
	loading: false,
	error: null,
};

export const updateStudentData = createAsyncThunk(
	'students/updateStudent',
	async (payload: { id: string; values: Partial<Student> }) => {
		const response = await updateStudent(payload.id, payload.values);
		return response;
	},
);

export const studentSlice = createSlice({
	name: 'students',
	initialState,
	reducers: {
		setStudent(state, action) {
			state.student = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateStudentData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateStudentData.fulfilled, (state, action) => {
				state.loading = false;
				state.student = action.payload;
			})
			.addCase(updateStudentData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Cập nhật thông tin thất bại';
			});
	},
});

export const { setStudent } = studentSlice.actions;

export default studentSlice.reducer;
