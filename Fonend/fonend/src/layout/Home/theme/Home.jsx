import React from 'react'
import CustomCarousels from '../../../Component/CustomCarousels/CustomCarousels'
import CustomProduc from '../../../Component/CustomProduc/CustomProduc'
import CustomCarouselcard from '../../../Component/CustomCarouselcard/CustomCarouselcard'
import { Container, Row,Col } from 'react-bootstrap'
import CustomListgroups from '../../../Component/CustomListgroups/CustomListgroups'


function Home() {
  return (
   <Container className='bg-white'>
    <Row className='pt-5'>
    <Col md={3}>
        <CustomListgroups/>
      
      </Col>
      <Col md={9}>
      <CustomCarousels/>
      
      </Col>
      
    </Row>
    <div className=''>
    <CustomProduc ></CustomProduc>
    </div>
    <CustomCarouselcard/>

    </Container>
  )
}

export default Home
