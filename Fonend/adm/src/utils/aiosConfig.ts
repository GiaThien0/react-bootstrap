// utils/axiosConfig.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/v1', // Thay đổi URL này theo cấu hình backend của bạn
    timeout: 10000, // Thời gian timeout cho request
});

// Interceptors (tuỳ chọn)
axiosInstance.interceptors.request.use(
    (config :any) => {
        // Thêm token vào headers nếu có
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Xử lý lỗi request
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        // Xử lý dữ liệu phản hồi
        return response;
    },
    (error) => {
        // Xử lý lỗi phản hồi
        return Promise.reject(error);
    }
);

export default axiosInstance;
