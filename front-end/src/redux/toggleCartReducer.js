import { createSlice } from "@reduxjs/toolkit";

const toggle_state = 'toggle_state'

const initialState = {
    isOpen: false
}

export const toggleSlice = createSlice({
    name: 'toggle',
    initialState,
    reducers: {
        toggleState: (state, action) => {
            switch (action.type) {
                case "toggle_state":
                    
                    return {
                        ...state,
                        isOpen: !state.isOpen
                    };
            
                default:
                    return state;
            }
        }
    }
})

export const stateReducer = (state = initialState, action) => {
    switch (action.type) {
        case "toggle_state":
            
            return {
                ...state,
                isOpen: !state.isOpen
            };
    
        default:
           return state;
    }
}

export const { toggleState } = toggleSlice.actions

export default toggleSlice.reducer