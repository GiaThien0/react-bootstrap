import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Table, Image } from 'react-bootstrap';
import axiosInstance from '../../../utils/aiosConfig';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { useSelector } from 'react-redux'; // Import useSelector để lấy dữ liệu từ Redux store
import { RootState } from '../../../redux/store'; // Import RootState để sử dụng trong useSelector

function Checkout() {
    const navigate = useNavigate(); 
    const location = useLocation();

    // Lấy thông tin người dùng từ Redux store
    const user = useSelector((state: RootState) => state.auth.user);
    const cart = useSelector((state: RootState) => state.cart);

    // Khai báo state cho totalAmount, products và userId
    const [totalAmount, setTotalAmount] = useState(null);
    const [phone, setPhone] = useState(user?.phone || '');
    const [address, setAddress] = useState(user?.address || '');
    const [paymentMethod, setPaymentMethod] = useState('credit_card'); // Phương thức thanh toán mặc định

    useEffect(() => {
        if (location.state) {
            const { totalAmount } = location.state;
            setTotalAmount(totalAmount);
        } else {
            // Nếu location.state là null, hiển thị thông báo và quay về trang chính
            alert('Bạn chưa đang nhập.');
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
    
        const orderData = {
            totalAmount: totalAmount,
            paymentMethod,
            phone,
            address,
            products: cart.items, // Lấy sản phẩm từ Redux store
        };
        console.log(orderData); 
    
        try {
            const response = await axiosInstance.post(`/order/checkout/${user.id}`, orderData);
            alert(response.data.message); // Thông báo thành công
            // Chuyển hướng người dùng đến trang khác sau khi thanh toán thành công
            navigate('/'); // Thay đổi từ history.push thành navigate
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
                        <option value="credit_card">Thẻ tín dụng</option>
                        <option value="paypal">PayPal</option>
                        <option value="cash_on_delivery">Thanh toán khi nhận hàng</option>
                    </Form.Control>
                </Form.Group>
                <div><h1>{totalAmount}</h1></div>
                <Button variant="primary" type="submit">
                    Thanh toán
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
}

export default Checkout;
