import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axiosInstance from '../../../utils/aiosConfig';

function User() {
    const [userId, setUserId] = useState(null);
    const [email, setemail] = useState(null);

  const [userData, setUserData] = useState({
    name: '',
    address: '',
    phone: '',  // Giữ lại trường phone
  });

  // Fetch thông tin người dùng từ API
  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get('/auth/adm/userdata', { withCredentials: true });
      console.log('API response:', response.data);  // Kiểm tra phản hồi từ API

      const { name, address, phone,id,email } = response.data.user;  // Giả sử API trả về name, address và phone
      setUserId(id);
      setemail(email)
      setUserData({
        name,
        address,
        phone,
      
      });


    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    console.log()
    fetchUserData();
  }, []);  // Lần đầu tiên khi component render

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error('User ID is missing');
      return;
    }
    try {
      await axiosInstance.put(`/auth/Userupdate/${userId}`, userData);  // Gửi PUT request với userId
      alert('Thông tin người dùng đã được cập nhật!');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto">
          <h2>Chỉnh sửa thông tin người dùng</h2>

          <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                name="email"
                value={email}
                readOnly // Làm cho ô input này chỉ có thể xem, không thể chỉnh sửa
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Bỏ qua email trong form */}
            
            <Form.Group controlId="formAddress">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập địa chỉ"
                name="address"
                value={userData.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập số điện thoại"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Lưu
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default User;
