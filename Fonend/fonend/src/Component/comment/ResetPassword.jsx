import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/aiosConfig';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate(); // Use useNavigate here

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosInstance.post('/auth/reset-password', { token, newPassword });
            setMessage(res.data.message);
            navigate('/login'); // Use navigate() instead of history.push()
        } catch (err) {
            setMessage('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    return (
        <div>
            <h2>Đặt lại mật khẩu</h2>
            <form onSubmit={handleResetPassword}>
                <label>
                    Mật khẩu mới:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Đặt lại mật khẩu</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
