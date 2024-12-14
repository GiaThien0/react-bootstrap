import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axiosInstance from '../../../utils/aiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../redux/authSlice';

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [userId, setUserId] = useState(user?.id);
  const [email, setEmail] = useState(user?.email || '');
  const [userData, setUserData] = useState({
    name: user?.name || '',
    address: user?.address || '',
    phone: user?.phone || '',
  });

  useEffect(() => {
    // API trả về full thông tin user, không cần header Authorization
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('/auth/userdata');
        if (response.status === 200) {
          const user = response.data.user;
          setUserId(user.id);
          setEmail(user.email);
          setUserData({
            name: user.name,
            address: user.address,
            phone: user.phone,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error('User ID is missing');
      alert('Vui lòng đăng nhập lại');
      return;
    }

    try {
      const response = await axiosInstance.put(`/auth/Userupdate/${userId}`, userData);
      const { accessToken } = response.data;

      if (accessToken) {
        // Cập nhật token vào localStorage (nếu cần)
        localStorage.setItem('accessToken', accessToken);
      }

      // Cập nhật thông tin người dùng
      setUserData({
        name: response.data.name || userData.name,
        address: response.data.address || userData.address,
        phone: response.data.phone || userData.phone,
      });

      dispatch(updateUser({
        name: response.data.name || userData.name,
        email,
        address: response.data.address || userData.address,
        phone: response.data.phone || userData.phone,
      }));

      alert('Thông tin người dùng đã được cập nhật!');
            window.location.reload();

    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin người dùng:', error);
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
                readOnly
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
};

export default User;
