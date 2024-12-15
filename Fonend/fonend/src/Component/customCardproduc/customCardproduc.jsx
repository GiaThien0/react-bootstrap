import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import '../CustomCardproduc/CustomCardproduc.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/productSlice'; // Import action từ redux slice

function CustomCardproduc() {
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux store
  const { products, status, error } = useSelector((state) => state.products);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts()); // Dispatch action để fetch dữ liệu khi status là 'idle'
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p className="text-center">Loading...</p>;
  if (status === 'failed') return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <div className="product-carousel-container">
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
      >
        {products.map((product) => (
          <div key={product.id} className="mb-5">
            <Link to={`/Productdetail/${product.id}`} className="Card-Link">
              <Card className="product-card card-hover">
                <Card.Img
                  src={`http://localhost:4000/${product.image}`}
                  alt={product.name}
                />
                <Card.Body>
                  <Card.Title className="product-title">{product.name}</Card.Title>
                  <Card.Text className="product-price">
                    Giá bán: {product.price.toLocaleString('vi-VN')} đ
                    <Card.Img
                      src="https://cdn-v2.didongviet.vn/files/default/2024/9/17/0/1729122848588_label_02.jpg"
                      className="pt-2"
                      alt="label"
                    />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CustomCardproduc;
