import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Course } from '@/schemas/course.schema';
import { updateCourse } from '@/services/api/course';

interface CenterState {
	loading: boolean;
	error: string | null;
}

const initialState: CenterState = {
	loading: false,
	error: null,
};

export const updateCourseById = createAsyncThunk(
	'centers/updateById',
	async ({ id, values }: { id: string; values: Partial<Course> }) => {
		await updateCourse(id, values);
		return { id, values };
	},
);

export const courseSlice = createSlice({
	name: 'centers',
	initialState,
	reducers: {
		updateCoursePending: (state) => {
			state.loading = true;
			state.error = null;
		},
		updateCourseFulfilled: (state) => {
			state.loading = false;
		},
		updateCourseRejected: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	updateCoursePending,
	updateCourseFulfilled,
	updateCourseRejected,
} = courseSlice.actions;

export default courseSlice.reducer;
