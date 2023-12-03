import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems : localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity : 0,
    cartTotalAmount : 0,
    previousUrl : "",
}

const cartSlice = createSlice({
    name : "cart",
    initialState, 
    reducers : {
        ADD_TO_CART : (state, action) => {
            const productIndex = state.cartItems.findIndex((item) => item.createdAt.seconds === action.payload.createdAt.seconds);

            if(productIndex >= 0) {
                // item already exist in the cart
                // Increase the cartQuantity
                state.cartItems[productIndex].cartQuatity += 1;
                toast.info(`${action.payload.title} increase by 1`, {position : "top-left"})
            }else {
                // item doesnt exist in the cart
                // Add item to the cartQuantity
                const tempProduct = {...action.payload, cartQuatity: 1}
                state.cartItems.push(tempProduct)
                toast.success(`${action.payload.title} added to cart`, {position : "top-left"})
            }
            // save cart to localStorage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        DECREASE_CART(state, action) {
            const productIndex = state.cartItems.findIndex((item) => item.createdAt.seconds === action.payload.createdAt.seconds);
            if(state.cartItems[productIndex].cartQuatity > 1) {
                state.cartItems[productIndex].cartQuatity -= 1;
                toast.info(`${action.payload.title} decrease by 1`, {position : "top-left"})
            }else if(state.cartItems[productIndex].cartQuatity === 1) {
                const newCartItem = state.cartItems.filter((item) => item.createdAt.seconds !== action.payload.createdAt.seconds);
                state.cartItems = newCartItem;
                toast.success(`${action.payload.title} removed from cart`, {position : "top-left"})
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        REMOVE_FROM_CART(state, action) {
            const newCartItem = state.cartItems.filter((item) => item.createdAt.seconds !== action.payload.createdAt.seconds);
            state.cartItems = newCartItem;
            toast.success(`${action.payload.title} removed from cart`, {position : "top-left"});

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        CLEAR_CART(state, action) {
            state.cartItems = [];
            toast.info(`Cart cleared`, {position : "top-left"});

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        CALCULATE_SUBTOTAL(state, action) {
            const array = [];
            state.cartItems.map((item) => {
                const {price, cartQuatity} = item;
                const cartItemAmount = price * cartQuatity;
                return array.push(cartItemAmount)
            });
            const totalAmount = array.reduce((a, b) => {
                return a + b;
            }, 0)
            state.cartTotalAmount = totalAmount;
        },
        CALCULATE_TOTAL_QUANTITY(state, action) {
            const array = [];
            state.cartItems.map((item) => {
                const {cartQuatity} = item;
                const quantity = cartQuatity;
                return array.push(quantity)
            });
            const totalQuantity = array.reduce((a, b) => {
                return (a + b);
            }, 0)
            state.cartTotalQuantity = totalQuantity;
        },
        SAVE_URL(state, action) {
            state.previousUrl = action.payload;
        }
    },
});

export const {
    ADD_TO_CART, 
    DECREASE_CART, 
    REMOVE_FROM_CART, 
    CLEAR_CART, 
    CALCULATE_SUBTOTAL,
    CALCULATE_TOTAL_QUANTITY,
    SAVE_URL
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousUrl = (state) => state.cart.previousUrl;

export default cartSlice.reducer;