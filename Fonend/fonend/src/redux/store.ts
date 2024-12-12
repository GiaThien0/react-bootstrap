import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice'; // Thêm authReducer
import bannerReducer from './BannerSlice'; // Thêm authReducer

const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        auth: authReducer, // Thêm authReducer vào store
        banners: bannerReducer, // Thêm bannerReducer vào store
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
