import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axiosInstance from '../../../utils/aiosConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector để lấy dữ liệu từ Redux store

const VNPAYPayment = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector((state) => state.auth.user);
    const cart = useSelector((state) => state.cart);

    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            totalAmount: location.state.totalAmount,
            paymentMethod: 'vnpay',
            phone: location.state.phone,
            address: location.state.address,
            products: cart.items,
            cardNumber,
            cardName,
            expiryDate,
            cvc
        };

        try {
            const response = await axiosInstance.post(`/order/checkout/${user.id}`, orderData);

            // Chuyển hướng tới trang thanh toán của VNPAY
            window.location.href = response.data.paymentUrl; 
        } catch (error) {
            alert(error.response?.data.message || error.message); // Thông báo lỗi
        }
    };

    return (
        <Container>
            <h2>Thông Tin Thẻ Thanh Toán</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formCardNumber">
                    <Form.Label>Số Thẻ</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Nhập số thẻ" 
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formCardName">
                    <Form.Label>Tên Trên Thẻ</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Nhập tên trên thẻ" 
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formExpiryDate">
                    <Form.Label>Hạn Sử Dụng</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="MM/YY" 
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formCvc">
                    <Form.Label>CVC</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Nhập CVC" 
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        required 
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Thanh Toán Qua VNPAY
                </Button>
            </Form>
        </Container>
    );
};

export default VNPAYPayment;
