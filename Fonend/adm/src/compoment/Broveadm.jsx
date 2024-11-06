import { useEffect } from 'react';
import axiosInstance from '../utils/aiosConfig';

function Broveadm({ setUserName, setUserRole,setLoading }) {

    useEffect(() => {
        setLoading(true);

        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/auth/adm/userdata', { withCredentials: true });
                const { name, role } = response.data.user;
                setUserName(name); // Gọi hàm để cập nhật tên người dùng
                setUserRole(role); // Gọi hàm để cập nhật vai trò người dùng
               
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false); // Hoàn tất tải
            }
        };

        fetchUserData();
    }, [setUserName, setUserRole,setLoading]); // Gọi lại khi hàm setUserName và setUserRole thay đổi

    return null; // Không render gì
}

export default Broveadm;
