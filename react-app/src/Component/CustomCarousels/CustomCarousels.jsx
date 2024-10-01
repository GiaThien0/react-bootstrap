import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import image6 from '../assets/hinh6.jpg';
import image4 from '../assets/hinh4.jpg';
import image3 from '../assets/hinh3.jpg';
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
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={image4}
        alt="Second slide"
        style={{ height: '500px', objectFit: 'cover' }}
      />
      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  </Container>
  );
}

export default CustomCarousels;
