// utils/axiosConfig.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/v1', // Thay đổi URL này theo cấu hình backend của bạn
    timeout: 10000, // Thời gian timeout cho request
});

// Interceptors (tuỳ chọn)
axiosInstance.interceptors.request.use(
    (config: any) => {
        // Thêm token vào headers nếu có
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => {
        // Xử lý lỗi request
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response: any) => {
        // Xử lý dữ liệu phản hồi
        return response;
    },
    (error: any) => {
        // Xử lý lỗi phản hồi
        console.error('Response Error:', error);
        if (error.response) {
            // Lỗi do server phản hồi (có mã trạng thái)
            console.error('Server Response:', error.response.data);
        } else if (error.request) {
            // Lỗi do không nhận được phản hồi
            console.error('No response received:', error.request);
        } else {
            // Lỗi trong quá trình thiết lập request
            console.error('Request Setup Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
