import { useEffect } from 'react';
import axiosInstance from '../utils/aiosConfig'; // Make sure this is correctly imported

function Broveadm({ setUserName, setUserRole, setLoading }) {

    useEffect(() => {
        setLoading(true);

        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/auth/userdata', { withCredentials: true });
                
                // Cập nhật state với thông tin người dùng từ API response
                const { name, role } = response.data.user;
                setUserName(name);
                setUserRole(role);
            } catch (error) {
                if (error.response?.status === 401) {
                    // Nếu lỗi 401, điều hướng người dùng đến trang đăng nhập
                    window.location.href = 'http://localhost:3000'; // Bạn có thể điều hướng đến trang đăng nhập nếu không có quyền
                } else {
                    console.error('Error fetching user data:', error);
                    window.location.href = '/'; // Nếu có lỗi khác, điều hướng về trang chủ
                }
            } finally {
                setLoading(false); // Hoàn tất tải
            }
        };

        fetchUserData();  // Gọi hàm để lấy dữ liệu người dùng từ API
    }, [setUserName, setUserRole, setLoading]);

    return null; // Không render gì
}

export default Broveadm;
