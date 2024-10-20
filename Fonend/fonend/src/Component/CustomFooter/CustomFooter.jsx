import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import zalo from '../assets/zalo.jpg'
import './CustomFooter.css'
import messenger from '../assets/messenger-icon.jpg'
function CustomFooter() {
  return (
    <Container fluid className='border-top border-dark mt-5 '>
   <Container>
    <Row className='mt-5 '>
        <Col md={3} >
            <h4 style={{color:'red'}}>
            1. Lazo Nguyễn Trãi
            </h4>
            <ul className='pt-4'>
              <li className='pb-3'>Địa chỉ: Số 290 Nguyễn Trãi, Thanh Xuân, Hà Nội</li>
              <li className='pb-3'>Điện thoại: 01234.567.890
              </li>
              <li className='pb-3'>Email: webdemo@gmail.com</li>
              <li className='pb-3'>Bản đồ chỉ đường</li>
            </ul>
        </Col>
        <Col md={3} >
            <h4 style={{color:'red'}}>
            2. Lazo Ninh Bình
            </h4>
            <ul className='pt-4'>
              <li className='pb-3'>Địa chỉ: Số 123 Vân Giang, Đông Thành, Tp. Ninh Bình</li>
              <li className='pb-3'>Điện thoại: 01234.567.890
              </li>
              <li className='pb-3'>Email: demoweb@gmail.com</li>
              <li className='pb-3'>Bản đồ chỉ đường</li>
            </ul>
        </Col>
        <Col md={3} >
            <h4 style={{color:'red'}}>
            3. Lazo Nguyễn Trãi
            </h4>
            <ul className='pt-4'>
              <li className='pb-3'>Địa chỉ: Số 290 Nguyễn Trãi, Thanh Xuân, Hà Nội</li>
              <li className='pb-3'>Điện thoại: 01234.567.890
              </li>
              <li className='pb-3'>Email: webdemo@gmail.com</li>
              <li className='pb-3'>Bản đồ chỉ đường</li>
            </ul>
        </Col>
        <Col md={3} >
        <h4 style={{color:'red'}}>
        Tư vấn bán hàng
            </h4>

     
        <div >
          <a  href="https://www.google.com" className='d-flex' style={{ textDecoration: 'none' }}>
            <div>
          <img src={zalo} class="img-fluid" alt="Mô tả hình ảnh" />
          </div>  
          <div >
            <span className='messger'>
                Chat Zalo
            </span>
              <br></br>
              <p className='messger'style={{ color:'black' }} >
              0123.456.789</p>
          </div>
          
          
          </a>
          <a  href="https://www.google.com" className='d-flex' style={{ textDecoration: 'none' }}>
            <div>
          <img src={messenger} class="img-fluid" alt="Mô tả hình ảnh" />
          </div>  
          <div >
            <span className='messger'>
                Chat Facebook
            </span>
              <br></br>
              <p className='messger'style={{ color:'black' }} >
              Online 24/24</p>
          </div>
          
          
          </a>
          
        </div>

        
        </Col>


    </Row>

   </Container>
   </Container>
  )
}

export default CustomFooter
