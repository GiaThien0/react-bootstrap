import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../CustomCardproduc/CustomCardproduc.css';
import axiosInstance from '../../utils/aiosConfig';

function CustomCarouselcard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('products/getproducts');
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <Row>
        {products.slice(0, 6).map((product) => (
          <Col md={2} key={product._id} className="d-flex mb-5 "  > {/* Thay đổi từ md={3} thành md={2} */}
            <Link to={`/Productdetail/${product._id}`} className="card-hover w-100">
              <Card className="product-card d-flex flex-column h-100">
                <Card.Img  variant="top" src={product.image} ></Card.Img>
                <Card.Body className="d-flex flex-column">
                  <Card.Title style={{ color: 'black',fontSize:'15px' }}>{product.name}</Card.Title>
                 
                  <Card.Text style={{ color: "red" }}>
                    Giá bán: <span>{product.price.toLocaleString('vi-VN')} đ</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CustomCarouselcard;
