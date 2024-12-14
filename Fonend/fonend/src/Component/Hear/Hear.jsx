import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdPerson } from 'react-icons/md';
import SearchInput from '../SearchInput/SearchInput';
import '../Hear/Hear.css';
import axiosInstance from '../../utils/aiosConfig';

const Hear = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  // Thêm trạng thái loading
    const [cart, setCart] = useState([]);

    const calculateCartQuantity = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/auth/logoutUser', {}, { withCredentials: true });
            setUser(null);
            window.location.href = '/';
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    useEffect(() => {
        // Kiểm tra nếu có cookie hoặc token xác thực trước khi gọi API
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/auth/userdata', { withCredentials: true });
                setUser(response.data.user);
            } catch (error) {
                if (error.response?.status === 401) {
                    // Nếu lỗi 401, điều hướng người dùng đến trang đăng nhập
                } else {
                    console.error('Error fetching user data:', error);
                    setUser(null);  // Handle error if fetching fails
                }
            } finally {
                setLoading(false); // Khi dữ liệu đã được lấy xong, set loading = false
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;  // Hiển thị trạng thái loading trong khi chờ dữ liệu
    }

    return (
        <Container fluid className="green-background">
            <Row className="Hear-1">
                {/* Left Column - User Info / Home Link */}
                <Col md={3} className="text-center pt-2">
                    {user ? (
                        <>
                            <span><i className="bi bi-envelope">{user.email}</i></span> / 
                            <span><i className="bi bi-house"></i>Trang chủ</span>
                        </>
                    ) : (
                        <span><i className="bi bi-house"></i>Trang chủ</span>
                    )}
                </Col>

                {/* Center Column - Search */}
                <Col md={6}>
                    <SearchInput />
                </Col>

                {/* Right Column - Cart and User Info */}
                <Col md={3} className="d-flex gap-3 text-center">
                    <Link to="/Card" style={{ textDecoration: 'none' }}>
                        <Button variant="outline-light" className="Hear-2 cart-icon">
                            <i className="bi bi-bag"></i>
                            <span className="badge">{calculateCartQuantity()}</span>
                        </Button>
                    </Link>
                    {user ? (
                        <Dropdown>
                            <Dropdown.Toggle variant="danger" id="dropdown-basic">
                                <span>{user.name}</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/User">
                                    <Button variant="outline-Secondary" className="Hear-2">
                                        <MdPerson />
                                        <span>Thông tin của bạn</span>
                                    </Button>
                                </Dropdown.Item>
                                {user.role === 'admin' && (
                                    <Dropdown.Item href="http://localhost:3001/adm">
                                        <Button variant="outline-Secondary" className="Hear-2">
                                            <i className="bi bi-shield-lock"></i>
                                            <span>Trang Admin</span>
                                        </Button>
                                    </Dropdown.Item>
                                )}
                                <Dropdown.Item href="#/action-2">
                                    <Button variant="outline-Secondary" className="Hear-2" onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-right me-1"></i>
                                        <span>Đăng xuất</span>
                                    </Button>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Button variant="outline-light" className="Hear-2 me-4">
                                <i className="bi bi-person-fill me-1"></i>
                                <span>Tài khoản</span>
                            </Button>
                        </Link>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Hear;
