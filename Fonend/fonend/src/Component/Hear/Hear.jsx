import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import '../Hear/Hear.css';
import SearchInput from '../SearchInput/SearchInput';
import { Link } from 'react-router-dom';

import Cookies from 'js-cookie'; // Import thư viện js-cookie
import axiosInstance from '../../utils/aiosConfig';


function Hear() {
    const [userName, setUserName] = useState('');
    const [useremail, setUseremail] = useState('');

    useEffect(() => {

        fetchUserData();
    },);

    const fetchUserData = async () => {
           
        try {
            const response = await axiosInstance.get('/auth/adm/userdata', { withCredentials: true });
            const { name,email } = response.data.user;

            setUserName(name); // Gọi hàm để cập nhật tên người dùng
            setUseremail(email); // Gọi hàm để cập nhật tên người dùng
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    const handleLogout = async () => {
        try {
            // Gửi yêu cầu đến server 4000 để logout
            await axiosInstance.post('/auth/logoutUser', {}, { withCredentials: true });
    
            // Xóa thông tin người dùng khỏi localStorage
            localStorage.removeItem('username');
            localStorage.removeItem('userId');
            localStorage.removeItem('role');
    
            // Xóa cookie trên client (nếu đã lưu trên client)
            Cookies.remove('token');
    
            // Điều hướng về trang đăng nhập
            window.location.href = '/';
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    

    
    
    return (  
        <Container fluid className='green-background'>
            <Row className="Hear-1"> 
                <Col md={3} className="text-center pt-2">
                    <span><i className="bi bi-envelope">{useremail}</i></span>/
                    <span><i className="bi bi-house"></i>Trang chủ</span>
                </Col>
                <Col md={6}>
                    <SearchInput />
                </Col>
                <Col md={3} className='d-flex gap-3 text-center'>
                <Link to="/Card" style={{ textDecoration: 'none' }}>
                        <Button variant="outline-light" className='Hear-2 cart-icon'>
                            <i className="bi bi-bag"></i>
                            <span className="badge">1</span>
                        </Button>
                    </Link>
                    {userName ? (
                        <>
                           
                            <Dropdown>
      <Dropdown.Toggle variant="danger" id="dropdown-basic">
      <span>{userName}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1"><Button variant="outline-Secondary" className='Hear-2' onClick={handleLogout}>
                                <i className="bi bi-box-arrow-right me-1"></i>
                                <span>Đăng xuất</span>
                            </Button></Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
                           
                        </>
                    ) : (
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Button variant="outline-light" className='Hear-2 me-4'>
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
