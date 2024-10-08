import React from 'react'
import { Container, Row, Col, Image,Card, Button } from 'react-bootstrap';
import sanpham1 from '../../../Component/assets/sanpham1.jpg';
import '../theme/Productdetail.css'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
function Productdetail() {
  return (
    <Container className='mt-5'>
      <Row>
        <Col md={7}>
            <div>
            <Image src={sanpham1} alt="Hình chính" fluid />
                
            </div>
        </Col>
        <Col md={5}>
        <Card.Text className='fs-2'>
        Áo thun đen DNGTREE
        </Card.Text >
        <span className='d-flex'><FaStar style={{ color: 'gold', fontSize: '1.3rem' }} />
        <FaStar style={{ color: 'gold', fontSize: '1.3rem' }} /> 
        <FaStar style={{ color: 'gold', fontSize: '1.3rem' }} /> 
        <FaStarHalf style={{ color: 'gold', fontSize: '1.3rem' }}/>/ <p style={{color:'Silver'}}>đã bán 1000</p> </span>

        <h2 style={{backgroundColor:'#EEEEEE'}} className='mt-2'> <span className="fw-bold underline" >200.000</span></h2>
        <div className='d-flex gap-3'>
        <p className=''>Giao đến <span className="fw-bold">q1 , P,Bến Nghé,     Hồ Chí Minh </span></p><a href="http://webcoban.vn" >Giao đến</a>
        </div>
        <hr />
        <p>Số lượng</p>
        <div className='d-flex text-center gap-4 ' style={{backgroundColor:'#EEEEEE'}}>
        <Button as='' className='custom-button' style={{marginLeft:'40%'}}>+</Button>
        <p className='border'> 3</p>        
        <Button as='' className='custom-button'>-</Button>
        </div>
        <hr />
        <div className='d-flex gap-5'>
            <Button className='w-50 custom-buttonred'>Chọn mua </Button>
            <Button className='w-50 custom-buttonblue' >Mua trả sau</Button>
        </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Productdetail
