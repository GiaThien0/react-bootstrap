import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';

// Cấu hình store với productReducer
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Định nghĩa các kiểu TypeScript cho store và dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
