import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';
import './CustomNav.css';

function CustomNav() {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="Logo"
            width="100"
            height="80"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        {/* Toggler for mobile view */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Menu */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto navbar-links d-flex justify-content-center w-100">
            <Nav.Link as={Link} to="/" className="navbar-item">Trang chủ</Nav.Link>
            <Nav.Link as={Link} to="/Products" className="navbar-item">Sản phẩm</Nav.Link>
            <Nav.Link as={Link} to="/Contact" className="navbar-item">Liên hệ</Nav.Link>
            <Nav.Link as={Link} to="/Address" className="navbar-item">Địa chỉ</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNav;
