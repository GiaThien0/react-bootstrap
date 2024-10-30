import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap';
import axiosInstance from '../utils/aiosConfig';
import Moddal from '../compoment/Moddal';

function Home() {
  const [validated, setValidated] = useState(false);
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalShow, setModalShow] = React.useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUsers();
}, []);

  const fetchUsers = async () => {
    try {
        const response = await axiosInstance.get('/auth/readusers');
        setUsers(response.data);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
    }
};
const handleDelete = async (id) => {
  try {
      await axiosInstance.delete(`/auth/deleteUser/${id}`);
      fetchUsers(); // Cập nhật lại danh sách sau khi xóa
  } catch (error) {
      console.error('Lỗi khi xóa người dùng:', error);
  }
};
  const handleadduser = async () => {
    try {
      const response = await axiosInstance.post('/auth/addUser', {
        name,
        email,
        password,
        role,
      });
      console.log('User added:', response.data);
      fetchUsers(); 
      setErrorMessage('bạn đã thêm tài khoản thành công');

    } catch (error) {
      console.error('Error adding user:', error);
      setErrorMessage('có lỗi xảy ra hãy nhập đúng tên email password');

    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    return form.checkValidity(); // Trả về true nếu hợp lệ
  };

  const handleBoth = (event) => {
    event.preventDefault(); // Ngăn chặn hành vi gửi mặc định
    const isValid = handleSubmit(event); // Gọi handleSubmit

    if (isValid) {
      handleadduser(); // Chỉ gọi handleSubmits nếu biểu mẫu hợp lệ
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={4}>
          <Form noValidate validated={validated} onSubmit={handleBoth}>
            <Row className="mb-3">
              <Form.Group controlId="validationCustom01">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Tên"
                  value={name}
                  onChange={(e) => setname(e.target.value)} // Cập nhật username
                />
                <Form.Control.Feedback type="invalid">Bạn chưa điền tên</Form.Control.Feedback>
              </Form.Group>
             
              
            </Row>
            <Row className='mb-3'>
            <Form.Group controlId="validationCustom02">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Cập nhật password
                />
                <Form.Control.Feedback type="invalid">Bạn chưa điền mật khẩu</Form.Control.Feedback>
              </Form.Group>

            </Row> 
            <Row className="mb-3">
            <Form.Group  controlId="validationCustomUsername">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Cập nhật email
                  />
                  <Form.Control.Feedback type="invalid">Bạn chưa điền email</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              
            </Row>
            <Row className='mb-3'>
              <Form.Group controlId="roleSelect">
                <Form.Label>Chọn vai trò</Form.Label>
                <Form.Select
                  aria-label="Select Role"
                  value={role} // Đảm bảo rằng giá trị này phản ánh state
                  onChange={(e) => {
                    setRole(e.target.value);
                    ; // In ra giá trị đã chọn
                  }}                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Button type="submit" >Gửi biểu mẫu</Button>
          </Form>
          {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>} {/* Hiển thị thông báo lỗi */}

        </Col>
        <Col md={8}>
      
            <h1>Danh Sách Người Dùng</h1>
            <Table striped bordered hover className='text-center'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Vai Trò</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                {users.map(user => (

                        <tr  key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                            <Button variant="primary" onClick={() => {
                                               setCurrentUser(user); 
                                               setModalShow(true);    
                                              }}>sửa</Button>
                                <Button variant="danger" onClick={()=> handleDelete(user._id)}>Xóa</Button>
                            </td>
                        </tr>
                                 ))}
                      <Moddal
  show={modalShow}
  onHide={() => setModalShow(false)}
  user={currentUser} // Truyền user hiện tại vào modal
  fetchUsers={fetchUsers}
/>
                </tbody>
            </Table>
      
        </Col>
      </Row>
                  
    </Container>
  );
}

export default Home;
