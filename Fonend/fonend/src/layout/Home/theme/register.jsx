import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../src/utils/aiosConfig'; // Đường dẫn đến file axiosInstance của bạn
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import logo from '../../../Component/assets/logo.webp';
import { useState } from 'react';

const Register = () => {
    const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
    const [confirmPassword, setConfirmPassword] = useState(''); // Lưu mật khẩu xác nhận riêng biệt
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Đặt lại thông báo lỗi trước khi thực hiện

        // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không
        if (registerData.password !== confirmPassword) {
            setErrorMessage('Mật khẩu và xác nhận mật khẩu không khớp.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axiosInstance.post('/auth/register', registerData);
            if (response.status === 200) {
                alert('bạn đã đang kí thành công')
                navigate('/login'); // Chuyển đến trang đăng nhập sau khi đăng ký thành công
            }
        } catch (error) {
            const message = 'Đăng ký không thành công. Vui lòng thử lại.';
            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <Row className="d-flex justify-content-center align-items-center pt-5">
                <Col md={6} className="text-center">
                    <Card.Img variant="top" src={logo} className="w-25" />
                </Col>

                <Col md={6} className="border border-3" style={{ width: '400px' }}>
                    <div className="text-center pt-2">
                        <h2><b>Đăng Ký</b></h2>
                    </div>
                    <Form onSubmit={handleRegister}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your full name"
                                value={registerData.name}
                                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={registerData.email}
                                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={registerData.password}
                                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} // Lưu giá trị vào confirmPassword
                                required
                            />
                        </Form.Group>

                        <Button className="w-100" variant="primary" type="submit" disabled={isLoading}>
                            {isLoading ? 'Đang đăng ký...' : 'Đăng Ký'}
                        </Button>
                    </Form>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                    <p className="text-center pb-2" style={{ fontSize: '15px' }}>
                        Already have an account? <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
