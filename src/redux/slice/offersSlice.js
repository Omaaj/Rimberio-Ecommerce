import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    offerHistory : [],
}

const offersSlice = createSlice({
    name : "offers",
    initialState, 
    reducers : {
        STORE_OFFERS(state, action) {
            state.offerHistory = action.payload;
        },
    },
});

export const {STORE_OFFERS} = offersSlice.actions;

export const selectOffers = (state) => state.offers.offerHistory;

export default offersSlice.reducer; 