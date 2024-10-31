import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import '../CustomCardproduc/CustomCardproduc.css';
import axiosInstance from '../../utils/aiosConfig';

function CustomCardproduc() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

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
    <Carousel 
      responsive={responsive}
      swipeable={true}
      draggable={true}
      showDots={false}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      style={{with:'25px'}}
    >
      
      {products.map((product) => (
        <div key={product._id} className="mb-5 ">
          <Link to={`/Productdetail/${product._id}`} className="Card-Link">
            <Card className="product-card card-hover ">
              <Card.Img variant="top" src={`http://localhost:4000/${product.image}`} className="" />
              <Card.Body >
                <Card.Title style={{ color: 'black',fontSize:'15px' }}>{product.name}</Card.Title>
                <Card.Text style={{ color: "red" }}>
                  Giá bán: <span>{product.price.toLocaleString('vi-VN')} đ</span>
                  <Card.Img variant="top" src=" https://cdn-v2.didongviet.vn/files/default/2024/9/17/0/1729122848588_label_02.jpg" className="pt-2" />
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </div>
      ))}
    </Carousel>
  );
}

export default CustomCardproduc;
