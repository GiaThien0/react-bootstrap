import { useEffect, useState } from "react";
import axiosInstance from "../utils/aiosConfig";
import { Button, Modal,Form } from "react-bootstrap";

function Moddal({ show, onHide, user, fetchUsers }) {
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(user?.role || 'user');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axiosInstance.put(`/auth/updateUser/${user._id}`, {
          name,
          email,
          password,
          role
        });
        fetchUsers(); // Cập nhật danh sách người dùng sau khi sửa
        onHide(); // Đóng modal sau khi sửa thành công
      } catch (error) {
        console.error("Lỗi khi cập nhật người dùng:", error);
      }
    };
  
    useEffect(() => {
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      }
    }, [user]);
  
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sửa Thông Tin Người Dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Mật Khẩu</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Vai Trò</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit" className="mt-3" >Lưu Thay Đổi</Button>
          </Form>
          
        </Modal.Body>
        <Modal.Body>Đã xảy ra lỗi trong quá cập nhật</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  export default Moddal;
