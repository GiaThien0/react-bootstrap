import React from 'react'
import CustomCarousels from '../../../Component/CustomCarousels/CustomCarousels'
import CustomProduc from '../../../Component/CustomProduc/CustomProduc'
import CustomCarouselcard from '../../../Component/CustomCarouselcard/CustomCarouselcard'
import { Container, Row,Col } from 'react-bootstrap'
import CustomListgroups from '../../../Component/CustomListgroups/CustomListgroups'


function Home() {
  return (
   <Container>
    <Row className='mt-5'>
    <Col md={4}>
        <CustomListgroups/>
      
      </Col>
      <Col md={8}>
      <CustomCarousels/>
      
      </Col>
      
    </Row>
    <div className='mt-5'>
    <CustomProduc ></CustomProduc>
    </div>
    <CustomCarouselcard/>

    </Container>
  )
}

export default Home
