import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useParams } from 'react-router-dom'; 
import axiosInstance from '../../../utils/aiosConfig'; 
import './Productdetail.css';

function Productdetail() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // State để theo dõi số lượng

  useEffect(() => {
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

    fetchProduct();
  }, [id]);
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1); // Tăng số lượng
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Giảm số lượng, không cho phép dưới 1
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <Container className='mt-5'>
      <Row>
        <Col md={7} className='card-hover'>
          <Image  src={product.image} alt="Hình chính" fluid /> 
        </Col>
        <Col md={5}>
          <Card.Text className='fs-2'>{product.name}</Card.Text> 
          <span className='d-flex'>
            <FaStar style={{ color: 'gold', fontSize: '1.3rem' }} />
            <FaStar style={{ color: 'gold', fontSize: '1.3rem' }} />
            <FaStar style={{ color: 'gold', fontSize: '1.3rem' }} />
            <FaStarHalf style={{ color: 'gold', fontSize: '1.3rem' }} />
            <p style={{ color: 'Silver' }}>đã bán {product.sold}</p> 
          </span>
            <Card.Text>{product.description}</Card.Text>
          <h2 style={{color:'red' }} className='mt-2'>
            <span  className="fw-bold underline">{product.price.toLocaleString('vi-VN')} đ</span> 
          </h2>
          <div className='d-flex gap-3'>
            <p className=''>Giao đến <span className="fw-bold">q1 , P,Bến Nghé, Hồ Chí Minh </span></p>
            <a href="/">Giao đến</a>
          </div>
          <hr />
          <p>Số lượng</p>
          <div className='d-flex gap-2 justify-content-center' style={{ backgroundColor: '#EEEEEE' }}>
            <Button className='custom-button ' onClick={increaseQuantity}>+</Button>
            <p >{quantity}</p>
            <Button className='custom-button' onClick={decreaseQuantity}>-</Button>
          </div>
          <hr />
        
          <div className='d-flex gap-5'>
            <Button className='w-50 custom-buttonred'>Chọn mua</Button>
            <Button className='w-50 custom-buttonblue'>Mua trả sau</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Productdetail;
