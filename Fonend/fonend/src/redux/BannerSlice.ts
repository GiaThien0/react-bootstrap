import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/aiosConfig';

interface Banner {
  _id: string;
  link: string;
  position: string;
  section: string;
  imageUrl: string;
  description: string; // Thêm trường description
}

interface BannerState {
  loading: boolean;
  banners: Banner[];
  error: string | null;
}

const initialState: BannerState = {
  loading: false,
  banners: [],
  error: null,
};

export const fetchBanners = createAsyncThunk<Banner[]>('banners/fetchBanners', async () => {
  const response = await axiosInstance.get<Banner[]>('/banner/list');
  return response.data;
});

const bannerSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch banners';
      });
  },
});

export default bannerSlice.reducer;
