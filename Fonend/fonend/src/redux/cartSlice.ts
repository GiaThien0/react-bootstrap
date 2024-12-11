import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    _id: string;
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

// Hàm lưu giỏ hàng vào localStorage
const saveCartToLocalStorage = (cart: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

// Hàm lấy giỏ hàng từ localStorage
const getCartFromLocalStorage = (): CartItem[] => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: getCartFromLocalStorage(), // Lấy trạng thái giỏ hàng từ localStorage khi khởi tạo
    },
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const item = state.items.find(item => item.product._id === action.payload.product._id);
            if (item) {
                if (item.quantity < item.product.stock) {
                    item.quantity += action.payload.quantity;
                }
            } else {
                state.items.push({ ...action.payload, quantity: action.payload.quantity });
            }
            saveCartToLocalStorage(state.items); // Lưu trạng thái giỏ hàng vào localStorage
        },
        increaseItemQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(item => item.product._id === action.payload);
            if (item && item.quantity < item.product.stock) {
                item.quantity += 1;
                saveCartToLocalStorage(state.items); // Lưu trạng thái giỏ hàng vào localStorage
            }
        },
        decreaseItemQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(item => item.product._id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                saveCartToLocalStorage(state.items); // Lưu trạng thái giỏ hàng vào localStorage
            } else if (item && item.quantity === 1) {
                state.items = state.items.filter(item => item.product._id !== action.payload);
                saveCartToLocalStorage(state.items); // Lưu trạng thái giỏ hàng vào localStorage
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.product._id !== action.payload);
            saveCartToLocalStorage(state.items); // Lưu trạng thái giỏ hàng vào localStorage
        },
        clearCart: (state) => {
            state.items = [];
            saveCartToLocalStorage(state.items); // Lưu trạng thái giỏ hàng vào localStorage
        },
    },
});

export const { addItem, increaseItemQuantity, decreaseItemQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
