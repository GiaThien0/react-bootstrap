import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanners } from '../../redux/BannerSlice';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CustomCarousels() {
  const dispatch = useDispatch();
  const { banners, loading, error } = useSelector(state => state.banners);

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  useEffect(() => {
    console.log('Banners:', headerBanners);
  }, [banners]);

  const headerBanners = banners.filter(banner => banner.position === 'heart' && banner.section.toLowerCase() === 'trang chủ');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <Carousel>
        {headerBanners.map((banner, index) => (
          <Carousel.Item key={banner._id}>
            <Link to={banner.link}>
              <img
                className="d-block w-100"
                src={`http://localhost:4000/${banner.imageUrl}`}
                alt={`Slide ${index + 1}`}
                style={{ height: 'auto', objectFit: 'cover' }}
              />
            </Link>
            <Carousel.Caption className="carousel-caption-custom">
              <p style={{ whiteSpace: 'pre-wrap' }}>{banner.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default CustomCarousels;
