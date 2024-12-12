import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { MdPerson } from 'react-icons/md';
import {jwtDecode} from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../../redux/authSlice';
import SearchInput from '../SearchInput/SearchInput';
import '../Hear/Hear.css';
import { RootState } from '../../redux/store';
import axiosInstance from '../../utils/aiosConfig';

const Hear = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const cart = useSelector((state: RootState) => state.cart.items);

    const calculateCartQuantity = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const handleLogout = async () => {
        try {
            // API call to log out the user (optional, if necessary)
            await axiosInstance.post('/auth/logoutUser', {}, { withCredentials: true });
            Cookies.remove('token');
            dispatch(logout());
            window.location.href = '/';
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                dispatch(loginSuccess({
                    id: decodedToken.id,
                    name: decodedToken.name,
                    email: decodedToken.email,
                    phone: decodedToken.phone,
                    address: decodedToken.address,
                    role: decodedToken.role, // Thêm trường role
                }));
            } catch (error) {
                console.error('Invalid or expired token', error);
            }
        }
    }, [dispatch]);

    return (
        <Container fluid className="green-background">
            <Row className="Hear-1">
                <Col md={3} className="text-center pt-2">
                    <span><i className="bi bi-envelope">{user?.email}</i></span> /
                    <span><i className="bi bi-house"></i>Trang chủ</span>
                </Col>
                <Col md={6}>
                    <SearchInput />
                </Col>
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
                                {user.role === 'admin' && ( // Chỉ hiển thị nếu người dùng là admin
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
}

export default Hear;
