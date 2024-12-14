import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../redux/productSlice';
import { addItemWithUpdate } from '../../../redux/cartSlice';
import axiosInstance from '../../../utils/aiosConfig'; // Sử dụng axios instance
import './Productdetail.css';
import Review from '../../../Component/comment/Review';

const Productdetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const products = useSelector((state) => state.products.products);
    const productStatus = useSelector((state) => state.products.status);
    const productError = useSelector((state) => state.products.error);

    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState(null);
    const [userData, setUserData] = useState({});
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (productStatus === 'idle') {
            dispatch(fetchProducts());
        }
    }, [productStatus, dispatch]);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get('/auth/userdata');
            if (response.status === 200) {
                const user = response.data.user;
                setUserId(user.id);
                setEmail(user.email);
                setUserData({
                    name: user.name,
                    address: user.address,
                    phone: user.phone,
                });
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setMessage('Không thể tải thông tin người dùng. Vui lòng đăng nhập lại.');
        }
    };

    const product = products.find(product => product._id === id);

    const addToCart = () => {
        if (!userId) {
            setMessage('Bạn chưa đăng nhập');
            return;
        }

        if (product) {
            console.log('Adding to cart:', { product, quantity, userId });
            dispatch(addItemWithUpdate(userId, { product, quantity }));
            navigate('/Card');
        }
    };

    if (productStatus === 'loading') return <p>Loading...</p>;
    if (productStatus === 'failed') return <p>Error: {productError}</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <Container className='mt-5'>
            <Row>
                <Col md={7}>
                    <div className='card-hover text-center'>
                        <Image src={`http://localhost:4000/${product.image}`} alt="Product Image" fluid />
                    </div>
                </Col>
                <Col md={5}>
                    <Card.Text className='fs-2'>{product.name}</Card.Text>
                    <div className='d-flex'>
                        <FaStar style={{ color: 'gold', fontSize: '1.3rem' }} />
                        <FaStar style={{ color: 'gold', fontSize: '1.3rem' }} />
                        <FaStar style={{ color: 'gold', fontSize: '1.3rem' }} />
                        <FaStarHalf style={{ color: 'gold', fontSize: '1.3rem' }} />
                        <p style={{ color: 'Silver' }}> Sản phẩm còn lại {product.stock}</p>
                    </div>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text style={{ fontSize: '25px' }}>Giá bán là: <span style={{ color: 'red' }}>{product.price.toLocaleString('vi-VN')}</span></Card.Text>
                    <div className='d-flex gap-3'>
                        <p>Giao đến <span className="fw-bold">{userData.address || "Bạn chưa lưu địa chỉ. Vui lòng cập nhật thông tin."}</span></p>
                    </div>
                    <hr />
                    <p>Số lượng</p>
                    <div className='d-flex gap-2 justify-content-center' style={{ backgroundColor: '#EEEEEE' }}>
                        <Button 
                            className='custom-button' 
                            onClick={() => setQuantity(prevQuantity => prevQuantity < product.stock ? prevQuantity + 1 : product.stock)}
                        >
                            +
                        </Button>
                        <div>
                            <p style={{ paddingTop: '20px' }}>{quantity}</p>
                        </div>
                        <Button 
                            className='custom-button' 
                            onClick={() => setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1)}
                        >
                            -
                        </Button>
                    </div>
                    <hr />
                    <div className='d-flex gap-5'>
                        <Button className='w-50 custom-buttonred' onClick={addToCart}>Chọn mua</Button>
                        <Button className='w-50 custom-buttonblue'>Mua trả sau</Button>
                    </div>
                    {message && <div className="mt-3 alert alert-info">{message}</div>}
                </Col>
            </Row>
            <Row>
                <Col md={7}>
                    <Review email={email} userId={userId} productId={product._id} />
                </Col>
            </Row>
        </Container>
    );
};

export default Productdetail;
