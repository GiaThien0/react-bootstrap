import React, { useEffect, useState } from 'react';
import { Button, Image, Table } from 'react-bootstrap';
import axiosInstance from '../utils/aiosConfig';

function Oder() {
  const [checkout, setCheckout] = useState([]);

  useEffect(() => {
    fetchCheckout();
  }, []);

  const fetchCheckout = async () => {
    try {
      const response = await axiosInstance.get('/order/getcheckout');
      setCheckout(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    }
  };
  const handleToggleApproval = async (orderId, productId, isCurrentlyApproved) => {
    try {
      const response = await axiosInstance.put(`/order/checkoutproducoder/${orderId}/${productId}`, {
        isApproved: !isCurrentlyApproved, // Đảo ngược trạng thái
      });
  
      const updatedOrder = response.data.order;
  
      if (!updatedOrder) {
        console.error('Dữ liệu trả về từ API không hợp lệ.');
        return;
      }
  
      // Cập nhật danh sách đơn hàng trong state
      setCheckout((prevCheckout) => {
        return prevCheckout.map((order) => {
          if (order._id === updatedOrder._id) {
            // Cập nhật sản phẩm trong đơn hàng tương ứng
            order.products = order.products.map((product) =>
              product.product._id === productId
                ? { ...product, isApproved: !isCurrentlyApproved } // Cập nhật trạng thái duyệt của sản phẩm
                : product
            );
          }
          return order;
        });
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái sản phẩm:', error);
    }
  };
  
  

  const renderProducts = (products, order, isApproved = false) =>
    products
      .filter((item) => item.isApproved === isApproved)
      .map((item) => (
        <tr key={`${order._id}-${item.product._id}`}>
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
          {!isApproved && (
            <td>
              <Button
                variant="success"
                onClick={() => handleToggleApproval(order._id, item.product._id, false)}
              >
                Duyệt
              </Button>
            </td>
          )}
        </tr>
      ));
  
      const renderProductss = (products, order, isApproved = true) =>
        products
          .filter((item) => item.isApproved === isApproved)
          .map((item) => (
            <tr key={`${order._id}-${item.product._id}`}>
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
              {isApproved && (
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleToggleApproval(order._id, item.product._id, true)}
                  >
                    Bỏ duyệt
                  </Button>
                </td>
              )}
            </tr>
          ));
      
  return (
    <div>
      <h3>Danh sách sản phẩm chưa duyệt</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Hình ảnh</th>
            <th>Trạng thái</th>
            <th>Phương thức thanh toán</th>
            <th>Tình trạng thanh toán</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Giá</th>
            <th>Thời gian đặt</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {checkout.map((order) => renderProducts(order.products, order, false))}
        </tbody>
      </Table>

      <h3>Danh sách sản phẩm đã duyệt</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Hình ảnh</th>
            <th>Trạng thái</th>
            <th>Phương thức thanh toán</th>
            <th>Tình trạng thanh toán</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Giá</th>
            <th>Thời gian đặt</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
        {checkout.map((order) => renderProductss(order.products, order, true))}

        </tbody>
      </Table>
    </div>
  );
}

export default Oder;
