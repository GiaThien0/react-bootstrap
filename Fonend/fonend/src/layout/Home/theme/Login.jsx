import axiosInstance from '../../../../src/utils/aiosConfig';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import logo from '../../../Component/assets/logo.webp';
import { Link } from 'react-router-dom';
import Socialogin from '../../../Component/Socialogin';
import { useState } from 'react';

const Login = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true);
    
        try {
            const response = await axiosInstance.post('/auth/loginUser', loginData,{ withCredentials: true });
    
            if (response.status === 200) {
               
               
                const role = response.data.user.role;

                if (role === 'admin') {
                   
                        window.location.href = 'http://localhost:3001/adm'; // Chuyển đến trang quản lý admin
                   
                } else {
                    window.location.href = '/'; // Chuyển đến trang quản lý người dùng
                }
            }
              
                
            
        }
         catch (error) {
            console.error('Lỗi đăng nhập:', error);
            const message = error.response?.data?.message || 'Đăng nhập không thành công. Vui lòng thử lại.';
            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <Row className="d-flex justify-content-center align-items-center pt-5">
                <Col md={6} className='text-center'>
                    <Link to="/">
                        <Card.Img variant="top" src={logo} className='w-25' />
                    </Link>
                </Col>

                <Col md={6} className='border border-3' style={{ width: '400px' }}>
                    <div className='text-center pt-2'>
                        <h2><b>Đăng Nhập</b></h2>
                    </div>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <div className='d-flex justify-content-between'>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>
                            <Link to="/forgot-password" style={{ textDecoration: 'none' }}>Forgot password?</Link>
                        </div>
                        <Button className='w-100' variant="primary" type="submit" disabled={isLoading}>
                            {isLoading ? 'Đang đăng nhập...' : 'Login'}
                        </Button>
                    </Form>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                    <div className='pt-3 pb-3'>
                        <Socialogin />
                    </div>
                    <p className='text-center pb-2' style={{ fontSize: '15px' }}>
                        Don't have an account? <Link to="/Register" style={{ textDecoration: 'none' }}>Sign up</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
