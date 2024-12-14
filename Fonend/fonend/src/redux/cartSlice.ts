import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../utils/aiosConfig';
import Cookies from 'js-cookie';

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

const initialState: { items: CartItem[]; status: 'idle' | 'loading' | 'succeeded' | 'failed'; error: string | null } = {
    items: [],
    status: 'idle',
    error: null
};

// Thunk để lấy giỏ hàng
interface ApiResponse {
    products: CartItem[];
}

export const fetchCartItems = createAsyncThunk<CartItem[], string>(
    'cart/fetchCartItems',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<ApiResponse>(`/cart/usercart/${userId}`);
            return response.data.products;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// Thunk để cập nhật giỏ hàng
export const updateCartInDatabase = createAsyncThunk<void, { userId: string; cart: CartItem[] }>(
    'cart/updateCartInDatabase',
    async ({ userId, cart }, { rejectWithValue }) => {
        try {
            await axiosInstance.post('/cart/updatecart', { userId, items: cart });
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },
        addItem: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.product._id === action.payload.product._id);
            if (existingItem) {
                if (existingItem.quantity < existingItem.product.stock) {
                    existingItem.quantity += action.payload.quantity; // Tăng số lượng
                }
            } else {
                if (action.payload.product.stock > 0) {  // Kiểm tra số lượng tồn kho
                    state.items.push(action.payload); // Thêm sản phẩm mới
                }
            }
        },
        increaseItemQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(item => item.product._id === action.payload);
            if (item && item.quantity < item.product.stock) {
                item.quantity += 1;
            }
        },
        decreaseItemQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(item => item.product._id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else if (item && item.quantity === 1) {
                state.items = state.items.filter(item => item.product._id !== action.payload);
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.product._id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(updateCartInDatabase.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCartInDatabase.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(updateCartInDatabase.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { setCartItems, addItem, increaseItemQuantity, decreaseItemQuantity, removeItem, clearCart } = cartSlice.actions;
const updateCart = async (dispatch: any, getState: any, userId: string) => {
    const updatedCart = getState().cart.items;
    await dispatch(updateCartInDatabase({ userId, cart: updatedCart }));
};

export const addItemWithUpdate = (userId: string, item: CartItem) => async (dispatch: any, getState: any) => {
    dispatch(addItem(item));
    await updateCart(dispatch, getState, userId);
};

export const increaseItemQuantityWithUpdate = (userId: string, productId: string) => async (dispatch: any, getState: any) => {
    dispatch(increaseItemQuantity(productId));
    await updateCart(dispatch, getState, userId);
};

export const decreaseItemQuantityWithUpdate = (userId: string, productId: string) => async (dispatch: any, getState: any) => {
    dispatch(decreaseItemQuantity(productId));
    await updateCart(dispatch, getState, userId);
};

export const removeItemWithUpdate = (userId: string, productId: string) => async (dispatch: any, getState: any) => {
    dispatch(removeItem(productId));
    await updateCart(dispatch, getState, userId);
};

export const clearCartWithUpdate = (userId: string) => async (dispatch: any, getState: any) => {
    dispatch(clearCart());
    await updateCart(dispatch, getState, userId);
};


export default cartSlice.reducer;
