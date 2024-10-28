import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp'
import './CustomNav.css'
function CustomNav() {
  
  return (
    
    <Navbar expand="lg" className="navabr">
    <Container>
    <Navbar.Brand as={Link} to="/">
          <img
            src={logo} // Thay thế bằng đường dẫn đến logo của bạn
            alt="Logo"
            width="100" // Chiều rộng logo (có thể thay đổi theo nhu cầu)
            height="80" // Chiều cao logo (có thể thay đổi theo nhu cầu)
            className="d-inline-block align-top" // Các lớp CSS để căn chỉnh logo
          />
          {' '} {/* Khoảng cách giữa logo và tên */}
        
        </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav"  >
        <Nav className="ms-auto ">
          <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
          <Nav.Link as={Link} to="/Products">sản phẩm</Nav.Link>
          <Nav.Link as={Link} to="/Contact">Liên hệ </Nav.Link> 
          <Nav.Link as={Link} to="/Address">địa chỉ</Nav.Link>          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  
  )
}

export default CustomNav
