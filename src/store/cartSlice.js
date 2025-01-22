import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }
        },

        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter((item) => item.id !== itemId);
        },

        updateQuantity: (state, action) => {
            const { id, amount } = action.payload;
            const item = state.items.find((i) => i.id === id);

            if (item) {
                item.quantity += amount;

                if (item.quantity <= 0) {
                    state.items = state.items.filter((i) => i.id !== id);
                }
            }
        },
        resetCart: (state) => {
            state.items = [];
        },
        setCart: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, resetCart,setCart } = cartSlice.actions;

export default cartSlice.reducer;
