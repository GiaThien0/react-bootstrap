import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import image6 from '../assets/slide-acer.jpg';
import image4 from '../assets/sildew.jpg';
import image3 from '../assets/sildeweb2.jpg';
import { Container } from 'react-bootstrap';


function CustomCarousels() {
  return (
    <Container>
    <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={image6}
        alt="First slide"
        style={{ height: '500px',width:'20px', objectFit: 'cover' }}
      />
      
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={image4}
        alt="Second slide"
        style={{ height: '500px', objectFit: 'cover' }}
      />
      <Carousel.Caption>
      <h3>Điện thoại thông minh</h3>
      <p>sam sum galasi s100</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={image3}
        alt="Third slide"
        style={{ height: '500px', objectFit: 'cover' }}
      />
      <Carousel.Caption>
      <h3>Điện thoại thông minh</h3>
      <p>sam sum galasi s100</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  </Container>
  );
}

export default CustomCarousels;
