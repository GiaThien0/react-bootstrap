import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axiosInstance from '../utils/aiosConfig';

function Moddalproducts({ show, onHide, product, fetchProducts, categories }) {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: null,
    stock: '' // Thêm stock
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        category: product.category?._id || '',
        image: null,
        stock: product.stock || '' // Đặt giá trị mặc định cho stock
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Kiểm tra giá trị của stock để đảm bảo không có số âm
    if (name === "stock" && value < 0) {
      return; // Nếu là số âm thì không thay đổi giá trị
    }

    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData({ ...productData, image: file });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('price', productData.price);
      formData.append('description', productData.description);
      formData.append('category', productData.category);
      if (productData.image) {
        formData.append('image', productData.image);
      }
      formData.append('stock', productData.stock); // Gửi giá trị stock

      await axiosInstance.put(`/products/updateProduct/${product._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      fetchProducts();
      onHide();
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
      setError('Không thể cập nhật sản phẩm. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cập Nhật Sản Phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="name">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Giá</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="stock">
            <Form.Label>Số lượng trong kho</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleInputChange}
              required
              min="0" // Đảm bảo không có số âm
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Giới thiệu</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={productData.description}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Loại sản phẩm</Form.Label>
            <Form.Select
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled hidden>
                Chọn loại sản phẩm
              </option>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Không có loại sản phẩm
                </option>
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Cập nhật Hình Ảnh</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
          </Form.Group>
          <Button type="submit" className="mt-3" disabled={loading}>
            {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Moddalproducts;
