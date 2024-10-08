import React from 'react'
import CustomCardproduc from '../customCardproduc/customCardproduc'
import { Col, Container, Row } from 'react-bootstrap';

function CustomProduc() {
  return (


    <Container className=''> 
        <h1 className='text-center pb-5'>Sản phẩm </h1>
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
