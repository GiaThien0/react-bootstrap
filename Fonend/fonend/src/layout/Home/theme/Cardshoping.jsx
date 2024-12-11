import React from 'react';
import { Container, Table, Image, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { increaseItemQuantity, decreaseItemQuantity, clearCart } from '../../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cardshopping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state: RootState) => state.cart.items);

    const handleCheckout = () => {
        const totalAmount = calculateTotal();
        const products = cart.map(item => ({ _id: item.product._id, quantity: item.quantity }));
        navigate('/checkout', { state: { totalAmount, products } });
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Tăng</th>
                        <th>Giảm</th>
                        <th>Giá</th>
                        <th>Tổng giá tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.length > 0 ? (
                        cart.map(item => (
                            <tr key={item.product._id}>
                                <td className='text-center' style={{ width: '20rem' }}>
                                    <Image src={`http://localhost:4000/${item.product.image}`} fluid style={{ width: '50%' }} />
                                </td>
                                <td className='text-center p-5'>{item.product.name}</td>
                                <td className='text-center p-5'>{item.quantity}</td>
                                <td className='text-center p-5'>
                                    <Button type="button" onClick={() => dispatch(increaseItemQuantity(item.product._id))}>+</Button>
                                </td>
                                <td className='text-center p-5'>
                                    <Button type="button" onClick={() => dispatch(decreaseItemQuantity(item.product._id))}>-</Button>
                                </td>
                                <td className='text-center p-5'>
                                    {item.product.price ? item.product.price.toLocaleString() : 'N/A'} VND
                                </td>
                                <td className='text-center p-5'>
                                    {(item.product.price * item.quantity).toLocaleString('vi-VN')} VND
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className='text-center'>Giỏ hàng trống</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <h4>Tổng giá trị giỏ hàng: {calculateTotal().toLocaleString('vi-VN')} VND</h4>

            <Button className='mt-5' onClick={() => dispatch(clearCart())}>Xóa toàn bộ sản phẩm</Button>
            <div className="d-flex justify-content-end">
                <Button onClick={handleCheckout}>Thanh toán đơn hàng</Button>
            </div>
        </Container>
    );
};

export default Cardshopping;
