import { useEffect } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie
import { jwtDecode } from 'jwt-decode';

function Broveadm({ setUserName, setUserRole, setLoading }) {

    useEffect(() => {
        setLoading(true);

        const fetchUserDataFromCookie = () => {
            try {
                // Lấy 'token' từ cookie
                const token = Cookies.get('token');
                
                if (token) {
                    // Giải mã token nếu có
                    const decodedToken = jwtDecode(token); // Giải mã JWT token

                    // Cập nhật state với thông tin người dùng từ token
                    setUserName(decodedToken.name); // Giả sử token chứa 'name'
                    setUserRole(decodedToken.role); // Giả sử token chứa 'role'
                } else {
                    console.error('No user data found in cookies');
                    // Xử lý trường hợp không có cookie (ví dụ: chuyển hướng người dùng về trang đăng nhập)
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error('Error fetching user data from cookies:', error);
            } finally {
                setLoading(false); // Hoàn tất tải
            }
        };

        fetchUserDataFromCookie();
    }, [setUserName, setUserRole, setLoading]); // Gọi lại khi hàm setUserName và setUserRole thay đổi

    return null; // Không render gì
}

export default Broveadm;
