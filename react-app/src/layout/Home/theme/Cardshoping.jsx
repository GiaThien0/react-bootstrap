import React from 'react'
import {  Container, Table,Image, Button } from 'react-bootstrap';
import hinhanh from '../../../Component/assets/hinh3.jpg'
function Cardshoping() {
  return (
    <Container>
        
        
    <Table striped bordered hover>
      <thead>
        <tr className='text-center'>
          <th>Hình ảnh</th>
          <th>Tên sản phẩm</th>
          <th>Số lượng</th>
          <th>Tăng </th>
          <th>Giảm</th>
          <th>Giá</th>
          <th>Tổng giá tiền</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='text-center' style={{width:'20rem'}}><Image src={hinhanh} fluid style={{width:'50%'}} /></td>
          <td className='text-center p-5'>Mark</td>
          <td className='text-center p-5'>1</td>
          <td className='text-center p-5'><Button as=''>+</Button></td>
          <td className='text-center p-5'><Button as=''>-</Button></td>
          <td className='text-center p-5'>1000.000</td>
          <td className='text-center p-5'></td>
        </tr>
        <tr>
          <td className='text-center' style={{width:'20rem'}}><Image src={hinhanh} fluid style={{width:'50%'}} /></td>
          <td className='text-center p-5'>Mark</td>
          <td className='text-center p-5'>1</td>
          <td className='text-center p-5'><Button as=''>+</Button></td>
          <td className='text-center p-5'><Button as=''>-</Button></td>
          <td className='text-center p-5'>1000.000</td>
          <td className='text-center p-5'></td>
        </tr>
        <tr>
          <td className='text-center' style={{width:'20rem'}}><Image src={hinhanh} fluid style={{width:'50%'}} /></td>
          <td className='text-center p-5'>Mark</td>
          <td className='text-center p-5'>1</td>
          <td className='text-center p-5'><Button as=''>+</Button></td>
          <td className='text-center p-5'><Button as=''>-</Button></td>
          <td className='text-center p-5'>1000.000</td>
          <td className='text-center p-5'>10000</td>
        </tr>
      </tbody>
      <Button className='mt-5' as=''>xóa sản toàn bộ sản phẩm </Button>
    </Table>

      <div className="d-flex justify-content-end">
        <Button as=''>Thanh toán đơn hàng</Button>
      </div>
     
    
    </Container>
  )
}

export default Cardshoping
