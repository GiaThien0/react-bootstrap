import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/aiosConfig'; // Đường dẫn đến file axiosInstance của bạn
import React, { useState } from 'react';

const Register = () => {
    const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState(''); // State để lưu thông báo lỗi
    const navigate = useNavigate(); // Sử dụng hook useNavigate

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Đặt lại thông báo lỗi trước khi thực hiện yêu cầu

        try {
            const response = await axiosInstance.post('auth/register', registerData); // Gửi yêu cầu đăng ký
            console.log('Phản hồi từ server:', response);

            if (response.status === 200) {
                // Chuyển hướng người dùng đến trang đăng nhập sau khi đăng ký thành công
                navigate('/login');
            }
        } catch (error) {
            console.error('Lỗi đăng ký:', error);
            // Lấy thông báo lỗi từ server nếu có
            const message = error.response?.data?.message || 'Đăng ký không thành công. Vui lòng thử lại.';
            setErrorMessage(message); // Cập nhật thông báo lỗi cho người dùng
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required // Bắt buộc nhập trường này
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required // Bắt buộc nhập trường này
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required // Bắt buộc nhập trường này
                />
                <button type="submit">Register</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Hiển thị thông báo lỗi */}
        </div>
    );
};

export default Register;
