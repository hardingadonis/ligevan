import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Teacher } from '@/schemas/teacher.schema';
import { updateTeacher } from '@/services/api/teacher';

interface TeacherState {
	teacher: Teacher | null;
	token: string | null;
	avatar: string | null;
	email: string | null;
	fullName: string | null;
	loading: boolean;
	error: string | null;
}

const initialState: TeacherState = {
	teacher: null,
	token: localStorage.getItem('teacherToken'),
	email: localStorage.getItem('teacherEmail'),
	avatar: null,
	fullName: null,
	loading: false,
	error: null,
};

export const updateTeacherData = createAsyncThunk(
	'teachers/updateTeacher',
	async (payload: { id: string; values: Partial<Teacher> }) => {
		const response = await updateTeacher(payload.id, payload.values);
		return response;
	},
);

export const teacherSlice = createSlice({
	name: 'teachers',
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
			localStorage.setItem('teacherToken', action.payload);
		},
		clearInfo: (state) => {
			state.token = null;
			state.email = null;
			state.avatar = null;
			state.fullName = null;
			state.teacher = null;
			localStorage.removeItem('teacherToken');
			localStorage.removeItem('teacherEmail');
		},
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
			localStorage.setItem('teacherEmail', action.payload);
		},
		setAvatar: (state, action: PayloadAction<string>) => {
			state.avatar = action.payload;
		},
		setFullName: (state, action: PayloadAction<string>) => {
			state.fullName = action.payload;
		},
		setTeacher: (state, action: PayloadAction<Teacher>) => {
			state.teacher = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateTeacherData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateTeacherData.fulfilled, (state, action) => {
				state.loading = false;
				state.teacher = action.payload;
			})
			.addCase(updateTeacherData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Cập nhật thông tin thất bại';
			});
	},
});

export const {
	setToken,
	setEmail,
	setAvatar,
	setFullName,
	setTeacher,
	clearInfo,
} = teacherSlice.actions;

export const selectToken = (state: { teachers: TeacherState }) =>
	state.teachers.token;
export const selectEmail = (state: { teachers: TeacherState }) =>
	state.teachers.email;
export const selectAvatar = (state: { teachers: TeacherState }) =>
	state.teachers.avatar;
export const selectFullName = (state: { teachers: TeacherState }) =>
	state.teachers.fullName;
export const selectTeacher = (state: { teachers: TeacherState }) =>
	state.teachers.teacher;
export const selectLoading = (state: { teachers: TeacherState }) =>
	state.teachers.loading;
export const selectError = (state: { teachers: TeacherState }) =>
	state.teachers.error;

export default teacherSlice.reducer;
