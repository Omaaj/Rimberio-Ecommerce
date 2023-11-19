import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reviewsHistory : [],
}

const reviewSlice = createSlice({
    name : "reviews",
    initialState, 
    reducers : {
        STORE_REVIEWS(state, action) {
            state.reviewsHistory = action.payload;
        },
    },
});

export const {STORE_REVIEWS} = reviewSlice.actions;

export const selectReviews = (state) => state.reviews.reviewsHistory;

export default reviewSlice.reducer; 