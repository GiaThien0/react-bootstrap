import React, { useEffect, useState } from 'react';
import { Button, Image, Table, Pagination, Alert } from 'react-bootstrap';
import axiosInstance from '../utils/aiosConfig';

function Shiper() {
  const [shipperOrders, setShipperOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchShipperOrders(currentPage);
  }, [currentPage]);

  const fetchShipperOrders = async (page) => {
    try {
      const response = await axiosInstance.get('/order/status/shipped', {
        params: { page, limit: 4 } 
      });
      setShipperOrders(response.data.orders || []);
      setTotalPages(response.data.totalPages || 1);
      setError(null);  // Xóa lỗi trước đó nếu có
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng đang giao:', error);
      setError('Lỗi khi lấy danh sách đơn hàng đang giao. Vui lòng thử lại sau.');
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await axiosInstance.delete(`/order/cancel/${orderId}`);
      fetchShipperOrders(currentPage);
      setError(null);  // Xóa lỗi trước đó nếu có
    } catch (error) {
      console.error('Lỗi khi hủy đơn hàng:', error);
      setError('Lỗi khi hủy đơn hàng. Vui lòng thử lại sau.');
    }
  };

  const renderOrderRow = (order) => {
    return (
      <React.Fragment key={order._id}>
        {order.products.map((item, index) => (
          <tr key={`${order._id}-${item.product?._id || 'unknown'}`}>
            {index === 0 && (
              <>
                <td rowSpan={order.products.length}>{order.user?.email || 'unknown'}</td>
                <td rowSpan={order.products.length}>{order.status}</td>
                <td rowSpan={order.products.length}>{order.paymentMethod}</td>
                <td rowSpan={order.products.length}>{order.paymentStatus}</td>
                <td rowSpan={order.products.length}>{order.address}</td>
                <td rowSpan={order.products.length}>{order.phone}</td>
                <td rowSpan={order.products.length}>{order.totalAmount}</td>
                <td rowSpan={order.products.length}>{new Date(order.createdAt).toLocaleString()}</td>
                <td rowSpan={order.products.length}>
                  <Button variant="danger" onClick={() => handleCancelOrder(order._id)}>Hủy đơn hàng</Button>
                </td>
              </>
            )}
            <td>{item.product?.name || 'Chưa có tên'}</td>
            <td>{item.quantity}</td>
            <td>
              {item.product?.image ? (
                <Image src={`http://localhost:4000/${item.product.image}`} className="w-25" rounded />
              ) : (
                'Chưa có hình ảnh'
              )}
            </td>
          </tr>
        ))}
      </React.Fragment>
    );
  };

  return (
    <div>
      <h3>Danh sách đơn hàng đang giao</h3>
      {error && <Alert variant="danger">{error}</Alert>}
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
          {shipperOrders.length > 0 ? shipperOrders.map((order) => renderOrderRow(order)) : <tr><td colSpan="12" className="text-center">Không có đơn hàng nào</td></tr>}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))} disabled={currentPage === 1} />
        {[...Array(totalPages).keys()].map((number) => (
          <Pagination.Item
            key={number + 1}
            active={number + 1 === currentPage}
            onClick={() => setCurrentPage(number + 1)}
          >
            {number + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
}

export default Shiper;
