import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../utils/aiosConfig';

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    image: string;
}

interface ProductState {
    products: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    status: 'idle',
    error: null,
};

export const fetchProducts = createAsyncThunk<Product[], void>(
    'products/fetchProducts',
    async (): Promise<Product[]> => {
        const response = await axiosInstance.get<Product[]>('/products/getproducts');
        return response.data;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error?.message || 'Failed to fetch products';
            });
    },
});

export default productSlice.reducer; // Export default cho reducer
