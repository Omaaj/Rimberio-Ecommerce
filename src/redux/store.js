import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import cartReducer from "./slice/cartSlice";
import productReducer from "./slice/productSlice";
import filterReducer from "./slice/filterSlice";
import checkoutReducer from "./slice/checkoutSlice";
import orderReducer from "./slice/orderSlice";
import reviewReducer from "./slice/reviewSlice";
import offersReducer from "./slice/offersSlice";
import arrivalReducer from "./slice/arrivalSlice";
import trendingReducer from "./slice/trendingSlice";
import featuredReducer from "./slice/featuredSlice";

const rootReducer = combineReducers({
    auth : authReducer,
    cart : cartReducer,
    product : productReducer,
    filter : filterReducer,
    checkout : checkoutReducer,
    orders : orderReducer,
    reviews : reviewReducer,
    offers : offersReducer,
    arrival : arrivalReducer,
    trending : trendingReducer,
    featured : featuredReducer,
});

const store = configureStore({
    reducer : rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;