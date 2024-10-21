import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TeacherState {
	token: string | null;
	avatar: string | null;
	email: string | null;
	fullName: string | null;
}

const initialState: TeacherState = {
	token: localStorage.getItem('teacherToken'),
	email: localStorage.getItem('teacherEmail'),
	avatar: null,
	fullName: null,
};

export const teacherSlice = createSlice({
	name: 'teachers',
	initialState: initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
		clearInfo: (state) => {
			state.token = null;
			state.email = null;
			state.avatar = null;
			localStorage.removeItem('teacherToken');
			localStorage.removeItem('teacherEmail');
		},
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		setAvatar: (state, action: PayloadAction<string>) => {
			state.avatar = action.payload;
		},
		setFullName: (state, action: PayloadAction<string>) => {
			state.fullName = action.payload;
		},
	},
});

export const { setToken, setEmail, setAvatar, setFullName, clearInfo } =
	teacherSlice.actions;

export const selectToken = (state: { teachers: TeacherState }) =>
	state.teachers.token;
export const selectEmail = (state: { teachers: TeacherState }) =>
	state.teachers.email;
export const selectAvatar = (state: { teachers: TeacherState }) =>
	state.teachers.avatar;
export const selectFullName = (state: { teachers: TeacherState }) =>
	state.teachers.fullName;

export default teacherSlice.reducer;
