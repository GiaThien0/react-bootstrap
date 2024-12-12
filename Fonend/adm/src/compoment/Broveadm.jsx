import { useEffect } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Import đúng cú pháp

function Broveadm({ setUserName, setUserRole, setLoading }) {

    useEffect(() => {
        setLoading(true);

        const fetchUserDataFromCookie = () => {
            try {
                // Lấy 'token' từ cookie
                const token = Cookies.get('token');
                
                if (token) {
                    // Giải mã token nếu có
                    const decodedToken = jwtDecode(token);

                    // Kiểm tra tính hợp lệ của token
                    const currentTime = Date.now() / 1000; // thời gian hiện tại tính bằng giây
                    if (decodedToken.exp < currentTime) {
                        // Token hết hạn, chuyển hướng về trang chủ
                        Cookies.remove('token');
                        window.location.href = '/';
                        return;
                    }

                    // Cập nhật state với thông tin người dùng từ token
                    setUserName(decodedToken.name);
                    setUserRole(decodedToken.role);
                } else {
                    console.error('No user data found in cookies');
                    window.location.href = '/';
                }
            } catch (error) {
                console.error('Error fetching user data from cookies:', error);
                window.location.href = '/';
            } finally {
                setLoading(false); // Hoàn tất tải
            }
        };

        fetchUserDataFromCookie();
    }, [setUserName, setUserRole, setLoading]);

    return null; // Không render gì
}

export default Broveadm;
