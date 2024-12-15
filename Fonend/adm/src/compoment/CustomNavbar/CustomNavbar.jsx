import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import Broveadm from '../Broveadm';
import axiosInstance from '../../utils/aiosConfig';
import Cookies from 'js-cookie'; // Import thư viện js-cookie

function CustomNavbar() {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true); // Khởi tạo loading

  useEffect(() => {
    // if (!loading) {
    //   // Nếu không phải admin, chuyển hướng đến trang localhost:3000
    //   if (userRole !== 'admin') {
    //     window.location.href = 'http://localhost:3000';
    //   }
    // }
  }, [userRole, loading]);

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
      window.location.href = 'http://localhost:3000';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="d-flex justify-content-between">
            <Nav.Link href="http://localhost:3000">Trang chủ</Nav.Link>

            
          </Navbar.Collapse>
          <Button variant="outline-Secondary" className="Hear-2" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i>
                <span>Đăng xuất</span>
              </Button>
              <div className="d-flex gap-2 mt-3">
              <Broveadm setUserName={setUserName} setUserRole={setUserRole} setLoading={setLoading} />

              <p>{userName}</p>
              <p>{userRole}</p>
              </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
