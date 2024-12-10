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
        const fetchCart = async () => {
            if (!userId) return; // Nếu không có userId, không cần gọi API
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
    }, [userId]);
    
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
        // Tính toán tổng số tiền
        const totalAmount = calculateTotal();
        
        // Kiểm tra nếu cart có sản phẩm
        const products = cart.products ? cart.products : [];
    
        console.log('Dữ liệu thanh toán trước khi điều hướng:', { totalAmount, products, userId });
    
        // Kiểm tra giỏ hàng có sản phẩm không
        if (products.length === 0) {
            alert("Giỏ hàng của bạn trống. Vui lòng thêm sản phẩm để thanh toán.");
            return;
        }
    
        // Điều hướng đến trang thanh toán
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
   // Tăng số lượng sản phẩm trong giỏ hàng
   const increaseQuantity = async (event, productId, stock) => {
    event.preventDefault();
    try {
        setCart(prevCart => {
            const updatedProducts = prevCart.products.map(item => {
                if (item.product._id === productId) {
                    if (item.quantity < stock) {
                        return { ...item, quantity: item.quantity + 1 }; // Tăng số lượng nếu chưa vượt quá tồn kho
                    } else {
                        alert('đã hết sản phẩm không thể tăng thêm');
                        return item;
                    }
                }
                return item;
            });
            return { ...prevCart, products: updatedProducts };
        });

        // Gửi yêu cầu tăng số lượng lên backend nếu số lượng trong giỏ thay đổi
        await axiosInstance.put(`/cart/increase/${userId}/${productId}`);
    } catch (error) {
        setError(error.response?.data.message || error.message);
    }
};

// Giảm số lượng sản phẩm trong giỏ hàng
const decreaseQuantity = async (productId, stock) => {
    try {
        setCart(prevCart => {
            const updatedProducts = prevCart.products.reduce((acc, item) => {
                if (item.product._id === productId) {
                    if (item.quantity > 1) {
                        acc.push({ ...item, quantity: item.quantity - 1 }); // Giảm số lượng nếu >= 1
                    } else {
                        // Nếu số lượng giảm xuống 0, xóa sản phẩm khỏi giỏ hàng
                        acc.push({ ...item, quantity: 0 });
                    }
                } else {
                    acc.push(item); // Cập nhật các sản phẩm khác
                }
                return acc;
            }, []);
            return { ...prevCart, products: updatedProducts };
        });

        // Gửi yêu cầu giảm số lượng lên backend nếu số lượng trong giỏ thay đổi
        await axiosInstance.put(`/cart/decrease/${userId}/${productId}`);
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
