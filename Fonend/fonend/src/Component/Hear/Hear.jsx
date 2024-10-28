import React from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import '../Hear/Hear.css';
import SearchInput from '../SearchInput/SearchInput';
import { Link } from 'react-router-dom';

import Cookies from 'js-cookie'; // Import thư viện js-cookie


function Hear() {
    const username = localStorage.getItem('username'); // Lấy tên người dùng từ localStorage
    console.log(document.cookie);


    const handleLogout = () => {
        // Xoá username khỏi localStorage
        localStorage.removeItem('username');
         localStorage.removeItem('userId'); // Xóa UserId nếu đã lưu
        // Xoá cookie
        Cookies.remove('token'); // Thay 'yourCookieName' bằng tên cookie của bạn
        
        // Điều hướng về trang đăng nhập
        window.location.href = '/';
        

    };
    
    return (  
        <Container fluid className='green-background'>
            <Row className="Hear-1"> 
                <Col md={3} className="text-center pt-2">
                    <span><i className="bi bi-envelope">lenguyengiathien0@gmail.com</i></span>/
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
                    {username ? (
                        <>
                           
                            <Dropdown>
      <Dropdown.Toggle variant="danger" id="dropdown-basic">
      <span>{username}</span>
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
