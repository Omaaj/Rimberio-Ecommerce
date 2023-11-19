import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filterProducts : []
}

const filterSlice = createSlice({
    name : "filter",
    initialState, 
    reducers : {
        FILTER_BY_SEARCH(state, action) {
            const {data, search} = action.payload
            const tempProducts = data.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()) || product.cat.toLowerCase().includes(search.toLowerCase()))
            state.filterProducts = tempProducts;
        },
        SORT_PRODUCT(state, action) {
            const {data, sort} = action.payload;
            let tempProducts = [];
            if(sort === "latest") {
                tempProducts = data;
            }else if(sort === "lowest-price") { 
                tempProducts = data.slice().sort((a, b) => {
                    return a.price - b.price
                })
            }else if(sort === "highest-price") { 
                tempProducts = data.slice().sort((a, b) => {
                    return b.price - a.price
                })
            }else if(sort === "a-z") { 
                tempProducts = data.slice().sort((a, b) => {
                    return a.title.localeCompare(b.title)
                })
            }else if(sort === "z-a") { 
                tempProducts = data.slice().sort((a, b) => {
                    return b.title.localeCompare(a.title)
                })
            }
            
            state.filterProducts = tempProducts
        },
        FITER_BY_CATEGORY(state, action) {
            const {data, category} = action.payload;
            let tempProducts = [];
            if(category === "All Products") {
                tempProducts = data
            }else {
                tempProducts = data.filter((product) => {
                    return product.tags === category
                })
            }
            state.filterProducts = tempProducts;
        },
        FITER_BY_PRICE(state, action) {
            const {products, price} = action.payload;
            let tempProducts = [];
            tempProducts = products.filter((product) => product.price <= price)
            state.filterProducts = tempProducts
        }
    },
});

export const {FILTER_BY_SEARCH, SORT_PRODUCT, FITER_BY_CATEGORY, FITER_BY_PRICE} = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filterProducts

export default filterSlice.reducer; 