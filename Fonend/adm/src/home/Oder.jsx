import React, { useEffect, useState } from 'react';
import { Button, Image, Table, Pagination } from 'react-bootstrap';
import axiosInstance from '../utils/aiosConfig';

function Order() {
  const [checkout, setCheckout] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    console.log('Fetching checkout orders');
    fetchCheckout(currentPage);
  }, [currentPage]);

  const fetchCheckout = async (page) => {
    try {
      const response = await axiosInstance.get('/order/list', {
        params: { page, limit: 4 }
      });
      setCheckout(response.data.orders || []); // Đảm bảo rằng checkout luôn là một mảng
      setTotalPages(response.data.totalPages || 1); // Đảm bảo rằng totalPages luôn có giá trị hợp lệ
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await axiosInstance.put(`/order/update-status/${orderId}`, { status: newStatus });
      fetchCheckout(currentPage);
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await axiosInstance.delete(`/order/cancel/${orderId}`);
      fetchCheckout(currentPage);
    } catch (error) {
      console.error('Lỗi khi hủy đơn hàng:', error);
    }
  };

  const renderOrderRow = (order) => {
    return order.products.map((item, index) => (
      <tr key={`${order._id}-${item.product?._id || index}`}>
        {index === 0 && (
          <>
            <td rowSpan={order.products.length}>{order.user?.email || 'unknown'}</td>
            <td rowSpan={order.products.length}>{order.status}</td>
            <td rowSpan={order.products.length}>{order.paymentMethod}</td>
            <td rowSpan={order.products.length}>{order.paymentStatus}</td>
            <td rowSpan={order.products.length}>{order.address}</td>
            <td rowSpan={order.products.length}>{order.phone}</td>
            <td rowSpan={order.products.length}>{order.totalAmount}</td>
            <td rowSpan={order.products.length}>{order.createdAt}</td>
            <td rowSpan={order.products.length}>
              <Button
                variant={order.status === 'pending' ? 'success' : 'danger'}
                onClick={() => handleUpdateOrderStatus(order._id, 'confirmed')}
              >
                Duyệt
              </Button>
              <Button variant="danger" onClick={() => handleCancelOrder(order._id)}>Hủy</Button>
            </td>
          </>
        )}
        <td>{item.product?.name || 'unknown'}</td>
        <td>{item.quantity}</td>
        <td>
          <Image src={`http://localhost:4000/${item.product?.image || 'unknown'}`} className="w-25" rounded />
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <h3>Danh sách đơn hàng</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Trạng thái</th>
            <th>Phương thức thanh toán</th>
            <th>Tình trạng thanh toán</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Giá</th>
            <th>Thời gian đặt</th>
            <th>Hành động</th>
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Hình ảnh</th>
          </tr>
        </thead>
        <tbody>
          {checkout.length > 0 ? checkout.map((order) => renderOrderRow(order)) : <tr><td colSpan="12" className="text-center">Không có đơn hàng nào</td></tr>}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.First onClick={() => setCurrentPage(1)} />
        <Pagination.Prev
          onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        />
        {[...Array(totalPages).keys()].map((number) => (
          <Pagination.Item
            key={number + 1}
            active={number + 1 === currentPage}
            onClick={() => setCurrentPage(number + 1)}
          >
            {number + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
        />
        <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
      </Pagination>
    </div>
  );
}

export default Order;
