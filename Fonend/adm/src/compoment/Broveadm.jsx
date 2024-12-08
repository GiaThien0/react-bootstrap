import { useEffect } from 'react';
import axiosInstance from '../utils/aiosConfig';

function Broveadm({ setUserName, setUserRole,setLoading }) {

    useEffect(() => {
        setLoading(true);

        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/auth/adm/userdata', { withCredentials: true });
                const { name, role } = response.data.user;
                setUserName(name);
                setUserRole(role);
                
            } catch (error) {
                console.error('Error fetching user data:', error);
            
                // Nếu lỗi 401, chuyển hướng về trang đăng nhập
                
            } finally {
                setLoading(false); // Hoàn tất tải
            }
        };
            
        fetchUserData();
    }, [setUserName, setUserRole,setLoading]); // Gọi lại khi hàm setUserName và setUserRole thay đổi

    return null; // Không render gì
}

export default Broveadm;
