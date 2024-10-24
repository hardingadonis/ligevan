import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Center } from '@/schemas/center.schema';
import { updateCenter } from '@/services/api/center';

interface CenterState {
	loading: boolean;
	error: string | null;
}

const initialState: CenterState = {
	loading: false,
	error: null,
};

export const updateCenterById = createAsyncThunk(
	'centers/updateById',
	async ({ id, values }: { id: string; values: Partial<Center> }) => {
		await updateCenter(id, values);
		return { id, values };
	},
);

export const centerSlice = createSlice({
	name: 'centers',
	initialState,
	reducers: {
		updateCenterPending: (state) => {
			state.loading = true;
			state.error = null;
		},
		updateCenterFulfilled: (state) => {
			state.loading = false;
		},
		updateCenterRejected: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	updateCenterPending,
	updateCenterFulfilled,
	updateCenterRejected,
} = centerSlice.actions;

export default centerSlice.reducer;
