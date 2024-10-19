import React from 'react'
import { Container,Carousel } from 'react-bootstrap';
import image6 from '../assets/hinh3.jpg'
import CustomCardproduc from '../CustomCardproduc/CustomCardproduc';
function CustomCarouselcard() {
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
        <h3>Điện thoại thông minh</h3>
        <p>sam sum galasi s100</p>
      </Carousel.Caption>
    </Carousel.Item>
    
  </Carousel>
  </Container>
  )
}

export default CustomCarouselcard
