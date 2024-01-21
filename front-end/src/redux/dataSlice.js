import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    loading: false,
    products: [],
    error: ''
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', () => {
    return axios
        .get('http://localhost:5500/api/products')
        .then(res => res.data)
        .catch(error => console.log(error))
})

export const productSlice = createSlice({
    name: 'data',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
            state.error = ''
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.error = action.error.message
        })
    }
})

export default productSlice.reducer