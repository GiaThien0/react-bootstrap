import React, { useEffect, useState } from 'react'
import { Image, Table } from 'react-bootstrap'
import axiosInstance from '../utils/aiosConfig';

function Oder() {
    const [checkout, setcheckout] = useState([]);


    useEffect(() => {
        fetchcheckout()
      }, []);
    
    

    const fetchcheckout = async () => {
        try {
          const response = await axiosInstance.get('/order/getcheckout'); // Đường dẫn API
          setcheckout(response.data);
        } catch (error) {
          console.error('Lỗi khi lấy danh sách loại sản phẩm:', error);
        }
      };
    


  return (
    <div>
     <Table striped bordered hover>
  <thead>
    <tr>

      <th>Tên email </th>
      <th>Tên sản phẩm</th>
      <th>Số lượng sản phẩm</th>
      <th>Hình</th>
      <th>Trạng thái đơn hàng</th>
      <th>Phương thức thanh toán</th>
      <th>Tình trạng thanh toán</th>
      <th>Địa chỉ</th>
      <th>Số điện thoại</th>
      <th>Giá đơn hàng</th>
      <th>thời giản đặt</th>
    </tr>
  </thead>
  <tbody>
    {checkout.map((order) => (
      order.products.map((item) => (

        <tr key={item._id}>
            <td>{order.user.email}</td>
          <td>{item.product.name}</td>
          <td>{item.quantity}</td>
          <td>
            <Image src={`http://localhost:4000/${item.product.image}`} className="w-25" rounded />
          </td>

          <td>{order.status}</td>
          <td>{order.paymentMethod}</td>
          <td>{order.paymentStatus}</td>
          <td>{order.address}</td>
          <td>{order.phone}</td>
          <td>{order.totalAmount}</td>
          <td>{order.createdAt}</td>
        </tr>
      ))
    ))}
  </tbody>
</Table>

    </div>
  )
}

export default Oder
