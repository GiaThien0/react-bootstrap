import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id?: string;
    name?: string;
    email?: string;
    address?: string;
    phone?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            
        },
        updateUser: (state, action: PayloadAction<User>) => {
            state.user = { ...state.user, ...action.payload };
        }
    },
});

export const { loginSuccess, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;