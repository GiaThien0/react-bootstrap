import React, { useState } from 'react'
import { Button, Col, Container, Offcanvas, Row } from 'react-bootstrap'
import CustomListgroups from '../../../Component/CustomListgroups/CustomListgroups'
import CustomProduc from '../../../Component/CustomProduc/CustomProduc'



function Products() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container className='mt-5 mb-5'>
      <Row>
        <Col md={2} className=''>
        <Button variant="primary" onClick={handleShow}>
        <i class="bi bi-list"></i>

      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <CustomListgroups></CustomListgroups>
        </Offcanvas.Body>
      </Offcanvas>
       
          
        </Col>
        <Col md={10}   className='border-start'>
        <CustomProduc></CustomProduc>
         
        </Col>


      </Row>



    </Container>
  )
}

export default Products
