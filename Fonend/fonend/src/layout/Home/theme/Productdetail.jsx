import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../redux/productSlice'; // Đảm bảo sử dụng đúng đường dẫn
import { addItem } from '../../../redux/cartSlice'; // Đảm bảo sử dụng đúng đường dẫn
import { RootState } from '../../../redux/store'; // Đảm bảo sử dụng đúng đường dẫn
import './Productdetail.css';
import Review from '../../../Component/comment/Review';

const Productdetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const products = useSelector((state: RootState) => state.products.products);
  const productStatus = useSelector((state: RootState) => state.products.status);
  const productError = useSelector((state: RootState) => state.products.error);

  const user = useSelector((state: RootState) => state.auth.user); // Lấy thông tin người dùng từ Redux store

  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  useEffect(() => {
    console.log('Products:', products);
    console.log('User:', user); // Kiểm tra thông tin người dùng
  }, [products, user]);

  const product = products.find(product => product._id === id);

  const addToCart = () => {
    if (!user) {
      setMessage('Bạn chưa đăng nhập');
      return;
    }

    if (product) {
      dispatch(addItem({ product, quantity }));
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
            <p>Giao đến <span className="fw-bold">{user?.address || "Bạn chưa lưu địa chỉ cần đăng nhập vào thông tin để thêm"}</span></p> {/* Hiển thị địa chỉ từ Redux store */}
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
          <Review email={user?.email} userId={user?.id} productId={product._id} /> {/* Sửa lại để sử dụng _id */}
        </Col>
      </Row>
    </Container>
  );
};

export default Productdetail;
