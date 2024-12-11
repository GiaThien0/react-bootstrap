import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    image: string;
}

interface CartItem {
    product: Product;
    quantity: number;
}

const initialState: { items: CartItem[] } = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const item = state.items.find(item => item.product.id === action.payload.product.id);
            if (item) {
                if (item.quantity < item.product.stock) {
                    item.quantity += action.payload.quantity;
                }
            } else {
                state.items.push(action.payload);
            }
        },
        increaseItemQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(item => item.product.id === action.payload);
            if (item && item.quantity < item.product.stock) {
                item.quantity += 1;
            }
        },
        decreaseItemQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(item => item.product.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else if (item && item.quantity === 1) {
                state.items = state.items.filter(item => item.product.id !== action.payload);
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.product.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, increaseItemQuantity, decreaseItemQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
