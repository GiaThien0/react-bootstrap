import React, { useEffect, useState } from 'react';
import { Container, Table, Image, Button } from 'react-bootstrap';
import axiosInstance from '../../../utils/aiosConfig';
import { useNavigate } from 'react-router-dom';

function Cardshoping() {
    const navigate = useNavigate(); // Sử dụng useNavigate thay vì useHistory

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Lấy giỏ hàng khi component mount
    const [userId, setuserId] = useState('');

    useEffect(() => {
        // Nếu không có userId, đặt giỏ hàng thành rỗng và dừng API call
       

        const fetchCart = async () => {
            try {
                const response = await axiosInstance.get(`/cart/usercart/${userId}`);
                setCart(response.data);
            } catch (error) {
                setError(error.response?.data.message || error.message);
            } finally {
                setLoading(false);
            }
        };
       
        fetchCart();
    }, [userId],[cart]);
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/auth/adm/userdata', { withCredentials: true });
                const { id } = response.data.user;
    
               
    
                setuserId(id);
                console.log("User ID fetched:", id);
            } catch (error) {
                setError('Lỗi khi lấy thông tin người dùng: ' + (error.response?.data.message || error.message));
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchUserData();
    }, []);

    const handleCheckout = () => {
        const totalAmount = calculateTotal();
        const products = cart.products;
    
        console.log('Dữ liệu thanh toán trước khi điều hướng:', { totalAmount, products, userId });
    
        if (products.length === 0) {
            alert("Giỏ hàng của bạn trống. Vui lòng thêm sản phẩm để thanh toán.");
            return;
        }
    
        navigate('/checkout', {
            state: { totalAmount, products, userId },
        });
    };
    // Xóa toàn bộ giỏ hàng
    const clearCart = async () => {
        try {
            await axiosInstance.delete(`/cart/deletecart/${userId}`);
            setCart([]); // Đặt giỏ hàng thành rỗng sau khi xóa thành công
        } catch (error) {
            setError(error.response?.data.message || error.message);
        }
    };

    // Tăng số lượng sản phẩm trong giỏ hàng
    const increaseQuantity = async (event, productId) => {
        event.preventDefault();
        try {
             await axiosInstance.put(`/cart/increase/${userId}/${productId}`);
            // Cập nhật giỏ hàng
            setCart(prevCart => {
                const updatedProducts = prevCart.products.map(item => {
                    if (item.product._id === productId) {
                        return { ...item, quantity: item.quantity + 1 }; // Cập nhật số lượng
                    }
                    return item;
                });
                return { ...prevCart, products: updatedProducts };
            });
        } catch (error) {
            setError(error.response?.data.message || error.message);
        }
    };

    // Giảm số lượng sản phẩm trong giỏ hàng
    const decreaseQuantity = async (productId) => {
        try {
            await axiosInstance.put(`/cart/decrease/${userId}/${productId}`);
            
            // Cập nhật giỏ hàng
            setCart(prevCart => {
                const updatedProducts = prevCart.products.reduce((acc, item) => {
                    if (item.product._id === productId) {
                        // Nếu số lượng giảm xuống 0, không thêm sản phẩm vào mảng mới
                        if (item.quantity > 1) {
                            // Nếu số lượng lớn hơn 1, giảm số lượng
                            acc.push({ ...item, quantity: item.quantity - 1 });
                        }
                        // Nếu số lượng = 1, không thêm vào giỏ hàng (thực tế đã xóa sản phẩm)
                    } else {
                        // Nếu không phải sản phẩm đang giảm, thêm vào mảng mới
                        acc.push(item);
                    }
                    return acc;
                }, []);
    
                return { ...prevCart, products: updatedProducts };
            });
        } catch (error) {
            setError(error.response?.data.message || error.message);
        }
    };

    // Hiển thị thông báo lỗi nếu có
   

    // Hiển thị trạng thái loading
    if (loading) {
        return <div>Loading...</div>;
    }

    const calculateTotal = () => {
        if (!cart.products || cart.products.length === 0) {
            return 0; // Trả về 0 nếu không có sản phẩm
        }
    
        return cart.products.reduce((total, item) => {
            const price = item.product?.price || 0; // Lấy giá từ sản phẩm
            return total + (price * item.quantity); // Tính tổng
        }, 0); // Định dạng tổng
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
                {Array.isArray(cart.products) && cart.products.length > 0 ? (
        cart.products.map(item => {
            return (
                <tr key={item.product._id}>
                    <td className='text-center' style={{ width: '20rem' }}>
                        <Image src={`http://localhost:4000/${item.product.image}`} fluid style={{ width: '50%' }} />
                    </td>
                    <td className='text-center p-5'>{item.product.name}</td>
                    <td className='text-center p-5'>{item.quantity}</td>
                    <td className='text-center p-5'>
                        <Button type="button" onClick={(e) => increaseQuantity(e, item.product._id)}>+</Button>
                    </td>
                    <td className='text-center p-5'>
                        <Button type="button" onClick={() => decreaseQuantity(item.product._id)}>-</Button>
                    </td>
                    <td className='text-center p-5'>
                        {item.product.price ? item.product.price.toLocaleString() : 'N/A'} VND
                    </td>
                    <td className='text-center p-5'>
    {(item.product.price * item.quantity).toLocaleString('vi-VN')} VND
</td>
                    
                </tr>
            );
        })
    ) : (
        <tr>
            <td colSpan="7" className='text-center'>Giỏ hàng trống</td>
        </tr>
    )}
                </tbody>
            </Table>
            <h4>Tổng giá trị giỏ hàng: {calculateTotal().toLocaleString('vi-VN')} VND</h4>

            <Button className='mt-5' onClick={clearCart}>Xóa toàn bộ sản phẩm</Button>
            <div className="d-flex justify-content-end">
                <Button onClick={handleCheckout}>Thanh toán đơn hàng</Button>
            </div>
        </Container>
    );
}

export default Cardshoping;
