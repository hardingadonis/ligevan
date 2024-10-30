import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { NewSlot } from '@/schemas/slot.schema';
import { createSlot } from '@/services/api/slot';

interface SlotState {
	loading: boolean;
	error: string | null;
}

const initialState: SlotState = {
	loading: false,
	error: null,
};

export const createSlotAsync = createAsyncThunk(
	'slots/create',
	async (slot: NewSlot) => {
		const createdSlot = await createSlot(slot);
		return createdSlot;
	},
);

export const slotSlice = createSlice({
	name: 'slots',
	initialState,
	reducers: {
		createSlotPending: (state) => {
			state.loading = true;
			state.error = null;
		},
		createSlotFulfilled: (state) => {
			state.loading = false;
		},
		createSlotRejected: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { createSlotPending, createSlotFulfilled, createSlotRejected } =
	slotSlice.actions;

export default slotSlice.reducer;
