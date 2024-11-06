import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Table, Image } from 'react-bootstrap';
import axiosInstance from '../../../utils/aiosConfig';
import { useNavigate, useLocation } from 'react-router-dom'; // Thay đổi từ useHistory thành useNavigate

function Checkout() {
    const navigate = useNavigate(); // Thay đổi từ useHistory
    const location = useLocation();

    // Khai báo state cho totalAmount, products và userId
    const [totalAmount, setTotalAmount] = useState(null);
    const [products, setProducts] = useState([]);
    const [userId, setUserId] = useState(null);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('credit_card'); // Phương thức thanh toán mặc định

    useEffect(() => {
        // Kiểm tra nếu location.state không null
        if (location.state) {
            const { totalAmount, products, userId } = location.state;
            setTotalAmount(totalAmount);
            setProducts(products);
            setUserId(userId);
            
        } else {
            // Nếu location.state là null, hiển thị thông báo và quay về trang chính
            alert('Bạn chưa đang nhập.');
            navigate('/'); // Chuyển hướng về trang chính
        }

    }, [location.state, navigate]); // Chạy khi location.state thay đổi

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Kiểm tra thông tin thanh toán trước khi gửi
        if (!totalAmount || !userId || !products.length || !phone || !address) {
            alert('Thông tin thanh toán không đầy đủ.');
            return;
        }
    
    
        const orderData = {
            totalAmount: totalAmount,
            paymentMethod,
            phone,
            address,
            products, // Đảm bảo rằng mảng sản phẩm cũng được gửi
        };
        console.log(orderData); 
    
        try {
            const response = await axiosInstance.post(`/order/checkout/${userId}`, orderData);
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
      {products.map((item, index) => (
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
