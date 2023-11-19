import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    featuredHistory : [],
}

const featuredSlice = createSlice({
    name : "featured",
    initialState, 
    reducers : {
        STORE_FEATURED(state, action) {
            state.featuredHistory = action.payload;
        },
    },
});

export const {STORE_FEATURED} = featuredSlice.actions;

export const selectFeatured = (state) => state.featured.featuredHistory;

export default featuredSlice.reducer; 