import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isloggedIn : false,
    email : null,
    userName : null,
    userId : null,
}

const authSlice = createSlice({
    name : "auth",
    initialState, 
    reducers : {
        SET_ACTIVE_USER : (state, action) => {
            const {email, userName, userId} = action.payload
            state.isloggedIn = true;
            state.email = email;
            state.userName = userName;
            state.userId = userId;
        },
        REMOVE_ACTIVE_USER : (state, action) => {
            state.isloggedIn = false;
            state.email = null;
            state.userName = null;
            state.userId = null;
        }
    },
});

export const {SET_ACTIVE_USER ,REMOVE_ACTIVE_USER} = authSlice.actions;


export const selectIsLoggedInUser = (state) => state.auth.isloggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectuserName = (state) => state.auth.userName;
export const selectUserId = (state) => state.auth.userId;

export default authSlice.reducer; 