import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    arrivalHistory : [],
}

const arrivalSlice = createSlice({
    name : "arrival",
    initialState, 
    reducers : {
        STORE_ARRIVALS(state, action) {
            state.arrivalHistory = action.payload;
        },
    },
});

export const {STORE_ARRIVALS} = arrivalSlice.actions;

export const selectArrivals = (state) => state.arrival.arrivalHistory;

export default arrivalSlice.reducer; 