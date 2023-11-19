import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    trendingHistory : [],
}

const trendingSlice = createSlice({
    name : "trending",
    initialState, 
    reducers : {
        STORE_TRENDINGS(state, action) {
            state.trendingHistory = action.payload;
        },
    },
});

export const {STORE_TRENDINGS} = trendingSlice.actions;

export const selectTrendings = (state) => state.trending.trendingHistory;

export default trendingSlice.reducer; 