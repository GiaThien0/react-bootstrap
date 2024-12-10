import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import '../Hear/Hear.css';
import SearchInput from '../SearchInput/SearchInput';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import thư viện js-cookie
import axiosInstance from '../../utils/aiosConfig';
import { MdPerson } from 'react-icons/md';

function Hear() {
    const [userName, setUserName] = useState('');
    const [useremail, setUseremail] = useState('');
    const [cartQuantity, setCartQuantity] = useState(0); // Thêm state để lưu số lượng sản phẩm trong giỏ hàng
    const [id, setId] = useState('');

    // Hàm lấy giỏ hàng
    const fetchCart = async () => {
        if (!id) {
            setCartQuantity(0); // Nếu không có userId, đặt số lượng giỏ hàng là 0
            return;
        }

        try {
            const response = await axiosInstance.get(`/cart/usercart/${id}`);
            
            // Tính tổng số lượng sản phẩm trong giỏ hàng
            const totalQuantity = response.data.products.reduce((total, item) => total + item.quantity, 0);
            setCartQuantity(totalQuantity);
        } catch (error) {
            console.log(error.response?.data.message || error.message);
        }
    };

    // Hàm lấy dữ liệu người dùng
    const fetchUserData = async () => {
        try {
            const response = await axiosInstance.get('/auth/adm/userdata', { withCredentials: true });
            const { name, email, id } = response.data.user;
            setUserName(name);
            setUseremail(email);
            setId(id);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchCart();
        fetchUserData();
    }, [id]); // Khi id thay đổi, sẽ gọi lại API để cập nhật giỏ hàng

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/auth/logoutUser', {}, { withCredentials: true });
            localStorage.removeItem('username');
            localStorage.removeItem('userId');
            localStorage.removeItem('role');
            Cookies.remove('token');
            window.location.href = '/';
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <Container fluid className="green-background">
            <Row className="Hear-1">
                <Col md={3} className="text-center pt-2">
                    <span><i className="bi bi-envelope">{useremail}</i></span>/ 
                    <span><i className="bi bi-house"></i>Trang chủ</span>
                </Col>
                <Col md={6}>
                    <SearchInput />
                </Col>
                <Col md={3} className="d-flex gap-3 text-center">
                    <Link to="/Card" style={{ textDecoration: 'none' }}>
                        <Button variant="outline-light" className="Hear-2 cart-icon">
                            <i className="bi bi-bag"></i>
                            <span className="badge">{cartQuantity}</span> {/* Hiển thị số lượng sản phẩm trong giỏ hàng */}
                        </Button>
                    </Link>
                    {userName ? (
                        <Dropdown>
                            <Dropdown.Toggle variant="danger" id="dropdown-basic">
                                <span>{userName}</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/User">
                                    <Button variant="outline-Secondary" className="Hear-2">
                                        <MdPerson />
                                        <span>Thông tin của bạn</span>
                                    </Button>
                                </Dropdown.Item>

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
}

export default Hear;
