import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Table, Image } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector để lấy dữ liệu từ Redux store
import axiosInstance from '../../../utils/aiosConfig';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Lấy thông tin người dùng từ Redux store
    const user = useSelector((state) => state.auth.user);
    const cart = useSelector((state) => state.cart);

    // Khai báo state cho totalAmount, phone, address và paymentMethod
    const [totalAmount, setTotalAmount] = useState(null);
    const [phone, setPhone] = useState(user?.phone || '');
    const [address, setAddress] = useState(user?.address || '');
    const [paymentMethod, setPaymentMethod] = useState('vnpay'); // Phương thức thanh toán mặc định là VNPAY

    useEffect(() => {
        if (location.state) {
            const { totalAmount } = location.state;
            setTotalAmount(totalAmount);
        } else {
            // Nếu location.state là null, hiển thị thông báo và quay về trang chính
            alert('Bạn chưa đăng nhập.');
            navigate('/'); // Chuyển hướng về trang chính
        }
    }, [location.state, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra thông tin thanh toán trước khi gửi
        if (!totalAmount || !user || !cart.items.length || !phone || !address) {
            alert('Thông tin thanh toán không đầy đủ.');
            return;
        }

        try {
            const response = await axiosInstance.post(`/order/checkout/${user.id}`, {
                totalAmount,
                paymentMethod,
                phone,
                address,
                products: cart.items, // Lấy sản phẩm từ Redux store
            });

            if (paymentMethod === 'cash_on_delivery') {
                // Chuyển hướng tới trang thanh toán thành công khi chọn "Thanh toán khi nhận hàng"
                navigate('/payment-success');
            } else {
                // Chuyển hướng tới trang thanh toán của VNPAY hoặc phương thức khác
                window.location.href = response.data.paymentUrl;
            }
        } catch (error) {
            alert(error.response?.data.message || error.message); // Thông báo lỗi
        }
    };

    return (
        <Container>
            <h2>Thông tin địa chỉ giao hàng</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formPhone">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Nhập số điện thoại" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formAddress">
                    <Form.Label>Địa chỉ giao hàng</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Nhập địa chỉ giao hàng" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formPaymentMethod">
                    <Form.Label>Phương thức thanh toán</Form.Label>
                    <Form.Control 
                        as="select"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="vnpay">VNPAY</option>
                        <option value="credit_card">Thẻ tín dụng</option>
                        <option value="paypal">PayPal</option>
                        <option value="cash_on_delivery">Thanh toán khi nhận hàng</option>
                    </Form.Control>
                </Form.Group>
                <div><h1>{totalAmount?.toLocaleString()}</h1></div>
                <Button variant="primary" type="submit">
                    Tiếp Tục
                </Button>
            </Form>
            <Row className='pt-5'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Hình</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.items.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <Image src={`http://localhost:4000/${item.product.image}`} fluid style={{ width: '50px' }} />
                                </td>
                                <td>{item.product.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.product.price.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
};

export default Checkout;
