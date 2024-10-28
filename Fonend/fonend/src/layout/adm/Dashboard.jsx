import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Cập nhật import

function Dashboard() {
    const navigate = useNavigate(); // Sử dụng useNavigate
    const [loading, setLoading] = useState(true); // Trạng thái loading

    useEffect(() => {
        const role = localStorage.getItem('role');
        
        if (role !== 'admin') {
            navigate('/'); // Nếu không phải admin, chuyển về trang chủ
        } else {
            setLoading(false); // Nếu là admin, dừng loading
        }
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>; // Hiển thị loading nếu đang kiểm tra
    }

    return (
        <div>
            <h1>Welcome to the Admin Dashboard</h1>
            {/* Thêm nội dung quản lý admin tại đây */}
            <p>This is a protected admin area.</p>
        </div>
    );
}

export default Dashboard;
