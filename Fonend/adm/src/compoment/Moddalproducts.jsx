import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../utils/aiosConfig';

function Moddalproducts({ show, onHide, product, fetchProducts, categories }) {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: null // Thay đổi thành null cho file
  });

  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category._id,
        image: null // Đặt lại thành null
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData({ ...productData, image: file }); // Lưu trữ file ảnh
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('price', productData.price);
      formData.append('description', productData.description);
      formData.append('category', productData.category);
      if (productData.image) {
        formData.append('image', productData.image); // Thêm file ảnh vào FormData
      }

      await axiosInstance.put(`/products/updateProduct/${product._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Đảm bảo loại nội dung là multipart
        }
      });

      fetchProducts(); // Cập nhật danh sách sản phẩm
      onHide(); // Đóng modal
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
      // Bạn có thể thêm thông báo cho người dùng ở đây
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cập Nhật Sản Phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="name">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Giá</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Giới thiệu</Form.Label>
            <Form.Control
              type="text"
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
            >
              <option value="" disabled hidden>Chọn loại sản phẩm</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Cập nhật Hình Ảnh</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
          </Form.Group>
          <Button type="submit" className="mt-3">
            Lưu thay đổi
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Moddalproducts;
