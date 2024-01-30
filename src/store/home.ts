/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable array-callback-return */
import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";

/* eslint-disable @typescript-eslint/no-unused-vars */
interface ScanState {
    username: string;
}

const initialState: ScanState = {
    username: ''
};

export const ScanSlice = createSlice({
    name: "ScanReducer",
    initialState,
    reducers: {
        setUsername($state, action: PayloadAction<string>) {
            $state.username = action.payload;
        },
    },
});

export const { setUsername } = ScanSlice.actions;

export default ScanSlice.reducer;
