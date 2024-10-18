import React from 'react'
import CustomCardproduc from '../customCardproduc/customCardproduc'
import { Col, Container, Row } from 'react-bootstrap';

function CustomProduc() {
  return (


    <Container className='bg-warning pb-5'> 
        <h1 className='text-center  mt-5 pt-5 pb-5' >Sản phẩm </h1>
        <Row>
        <Col md={3}>
            <CustomCardproduc></CustomCardproduc>

        </Col>
        <Col md={3}>
            <CustomCardproduc></CustomCardproduc>

        </Col>
        <Col md={3}>
            <CustomCardproduc></CustomCardproduc>

        </Col>
        <Col md={3}>
            <CustomCardproduc></CustomCardproduc>

        </Col>
        
        </Row>
            

       </Container>
    
  )
}

export default CustomProduc
