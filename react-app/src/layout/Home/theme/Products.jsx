import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CustomListgroups from '../../../Component/CustomListgroups/CustomListgroups'
import CustomProduc from '../../../Component/CustomProduc/CustomProduc'



function Products() {
  return (
    <Container className='mt-5 mb-5'>
      <Row>
        <Col md={4} className=''>
          
          <CustomListgroups></CustomListgroups>
          
        </Col>
        <Col md={8}   className='border-start'>
        <CustomProduc></CustomProduc>
         
        </Col>


      </Row>



    </Container>
  )
}

export default Products
