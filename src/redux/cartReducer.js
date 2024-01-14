import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.products.find(item => item.id === action.payload.id)

            if(item) {
                item.quantity += action.payload.quantity
            } else {
                state.products.push(action.payload)
            }
        },

        removeItem: (state, action) => {
            state.products = state.products.filter(item => item.id !== action.payload)
        },

        decreaseQuantity: (state, action) => {
             const item = state.products.find(item => item.id === action.payload.id)

            if (item.quantity > 1) {
                item.quantity -= 1
            }
        },

        increaseQuantity: (state, action) => {
             const item = state.products.find(item => item.id === action.payload.id)

            item.quantity += 1
        },

        clearCart: (state) => {
            state.products = []
        }
    }
})

export const { addToCart, removeItem, decreaseQuantity, increaseQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer