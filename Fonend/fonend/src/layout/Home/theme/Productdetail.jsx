import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../utils/aiosConfig';
import './Productdetail.css';
import Review from '../../../Component/comment/Review';

function Productdetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState(null);
  const [message, setmessage] = useState(null);
  const [address, setaddress] = useState(null);

  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`products/getproducts/${id}`);
      setProduct(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get('/auth/adm/userdata', { withCredentials: true });
      const { id, email ,address} = response.data.user;
      setUserId(id);
      setEmail(email);
      setaddress(address)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchUserData();
  }, [id]);

  const addToCart = async () => {
    if (!userId) {
      setmessage('ban chua dang nhap')
      return;
    }

    try {
      const response = await axiosInstance.post('cart/addcart', {
        userId,
        productId: id,
        quantity,
      });
      console.log(response.data.message);
      console.log(response.data.cart);
      navigate('/Card');
    } catch (error) {
      console.error('Error adding product to cart:', error.response?.data?.message || error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <Container className='mt-5'>
      <Row>
        <Col md={7} >
          <div className='card-hover text-center '>
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
            <p style={{ color: 'Silver' }}>Đã bán {product.sold}</p>
          </div>
          <Card.Text>{product.description}</Card.Text>
          <h2 style={{ color: 'red' }} className='mt-2'>
            <span className="fw-bold underline">{product.price.toLocaleString('vi-VN')} đ</span>
          </h2>
          <div className='d-flex gap-3'>
            <p>Giao đến <span className="fw-bold">{address|| "Địa chỉ chưa có"}</span></p>
            <a href="/">Giao đến</a>
          </div>
          <hr />
          <p>Số lượng</p>
          <div className='d-flex gap-2 justify-content-center' style={{ backgroundColor: '#EEEEEE' }}>
            <Button className='custom-button' onClick={() => setQuantity(quantity + 1)}>+</Button>
            <p>{quantity}</p>
            <Button className='custom-button' onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</Button>
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
          <Review email={email} userId={userId} productId={product._id}  />
        </Col>
      </Row>
    </Container>
  );
}

export default Productdetail;
