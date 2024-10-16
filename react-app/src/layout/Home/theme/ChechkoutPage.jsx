import React from 'react'

import { Button,Container,Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function ChechkoutPage() {
  return (
    <Container className='mt-5'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Họ và tên</Form.Label>
        <Form.Control type="text" placeholder="Họ và tên" />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Địa chỉ</Form.Label>
        <Form.Control type="text" placeholder="Địa chỉ" />
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>số điện thoại</Form.Label>
        <Form.Control type="text" placeholder="Địa chỉ" />
        
      </Form.Group>
      <Form.Label>Phương thức vẩn chuyển</Form.Label>
      <Form.Select aria-label="Default select example">
      
      <option value="1">Thanh toán khi nhận hàng</option>
      <option value="2">Chuyển tiền ngân hàng</option>
      <option value="3">Ví trả sau</option>
    </Form.Select>
    <Link to="/">
      <Button  variant="primary" type="submit" className='mt-5'>

        Xác nhận đơn hàng
      </Button>
      </Link>
      </Container>
  )
}

export default ChechkoutPage
