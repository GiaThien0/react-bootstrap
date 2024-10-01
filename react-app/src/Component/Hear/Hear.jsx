import React from 'react'
import { Container, Row, Col,Button } from 'react-bootstrap';
import '../Hear/Hear.css'
import SearchInput from '../SearchInput/SearchInput';
function Hear() {
  return (  
<Container fluid className='green-background'>
    <Row className="Hear-1">
        <Col md={3} className="text-center pt-2">
            <span><i className="bi bi-envelope">lenguyengiathien0@gmail.com </i></span>/
            <span><i className="bi bi-house"></i>Trang chủ</span>
        </Col>
        <Col md={6}>
            <SearchInput/>
        </Col>
        <Col md={3}>
            <Button variant="outline-light" className='Hear-2 me-4'>
                <i className="bi bi-person-fill me-1"></i>
                <span>Tài khoản</span>
            </Button>{' '}
        
            <Button variant="outline-light "className='Hear-2 cart-icon' >
                <i className="bi bi-bag "></i>
                <span className="badge">1</span>
            </Button>{' '}
        </Col>
    </Row>
</Container>
  )
}

export default Hear
