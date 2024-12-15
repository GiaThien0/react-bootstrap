import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axiosInstance from '../utils/aiosConfig';

function ModdalDiscount({ show, onHide, discount, fetchDiscounts, products }) {
  const [discountData, setDiscountData] = useState({
    title: '',
    percentage: '',
    startDate: '',
    endDate: '',
    product: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Lấy dữ liệu discount khi modal được mở hoặc discount thay đổi
  useEffect(() => {
    console.log(discount); // Kiểm tra xem discount có giá trị hợp lệ không

    if (discount) {
      setDiscountData({
        title: discount.title || '',  // Đảm bảo lấy đúng trường 'title'
        percentage: discount.percentage || '',
        startDate: discount.startDate || '',
        endDate: discount.endDate || '',
        product: discount.product?._id || '',  // Sử dụng _id để so sánh
      });
    }
  }, [discount]);  // Khi discount thay đổi, cập nhật lại discountData

  // Hàm thay đổi dữ liệu khi người dùng nhập
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDiscountData({ ...discountData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Gửi yêu cầu cập nhật dữ liệu vào API
      const response = await axiosInstance.put(`/discount/updateDiscount/${discount._id}`, discountData);

      fetchDiscounts(); // Refresh discount list
      onHide(); // Close modal
    } catch (error) {
      console.error('Lỗi khi cập nhật mã giảm giá:', error);
      setError('Không thể cập nhật mã giảm giá. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Lọc ra sản phẩm có trong discount
  const availableProducts = products.filter(product => discountData.product === product._id);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cập Nhật Mã Giảm Giá</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="title">
            <Form.Label>Tên mã giảm giá</Form.Label>
            <Form.Control
              type="text"
              name="title"  // Đổi từ 'name' thành 'title'
              value={discountData.title}  // Đảm bảo sử dụng discountData.title
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="percentage">
            <Form.Label>Phần trăm giảm giá (%)</Form.Label>
            <Form.Control
              type="number"
              name="percentage"
              value={discountData.percentage}
              onChange={handleInputChange}
              required
              min="1"
              max="100"
            />
          </Form.Group>
          <Form.Group controlId="startDate">
            <Form.Label>Ngày bắt đầu</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={discountData.startDate}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="endDate">
            <Form.Label>Ngày kết thúc</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={discountData.endDate}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
         
          <Button type="submit" className="mt-3" disabled={loading}>
            {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModdalDiscount;
