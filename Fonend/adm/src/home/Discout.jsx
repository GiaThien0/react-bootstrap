import React, { useEffect, useState } from 'react';
import { Button, Row, Form, Container, Col, Table } from 'react-bootstrap';
import axiosInstance from '../utils/aiosConfig';
import ModdalDiscount from '../compoment/ModdalDiscount';

function Discounts() {
  const [discounts, setDiscounts] = useState([]);
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [modalShow, setModalShow] = useState(false);
const [currentDiscount, setCurrentDiscount] = useState(null);
  const [discountData, setDiscountData] = useState({
    title: '',
    percentage: '',
    startDate: '',
    endDate: '',
    image: null,
    products: [],
    createdBy:userId
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDiscounts();
    fetchProducts();
    fetchUser();
  }, [userId]);

  // Lấy thông tin người dùng
  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get('/auth/userdata', { withCredentials: true });
      if (response.status === 200) {
        const user = response.data.user;
        setUserId(user.id);
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng:', error);
    }
  };
  const handleUpdateDiscount = (discount) => {
    setCurrentDiscount(discount);
    setModalShow(true);
  };
  // Lấy danh sách giảm giá
  const fetchDiscounts = async () => {
    try {
      const response = await axiosInstance.get('/discount/getAllDiscounts');
      setDiscounts(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách giảm giá:', error);
    }
  };

  // Lấy danh sách sản phẩm
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products/getproducts');
      setProducts(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    }
  };

  // Xử lý thay đổi dữ liệu giảm giá
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDiscountData({ ...discountData, [name]: value });
  };

  // Thêm sản phẩm vào danh sách sản phẩm của giảm giá
  const handleAddProduct = (productId) => {
    if (!discountData.products.includes(productId)) {
      setDiscountData({
        ...discountData,
        products: [...discountData.products, productId],
      });
    }
  };
  const handleDeleteDiscount = async (discountId) => {
    try {
      const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa giảm giá này không?');
      if (!confirmDelete) return;
  
      const response = await axiosInstance.delete(`/discount/deleteDiscount/${discountId}`);
      if (response.status === 200) {
        setMessage('Giảm giá đã được xóa thành công!');
        fetchDiscounts(); // Làm mới danh sách giảm giá
      }
    } catch (error) {
      console.error('Lỗi khi xóa giảm giá:', error);
      setMessage('Lỗi: Không thể xóa giảm giá.');
    }
  };
  // Xóa sản phẩm khỏi danh sách
  const handleRemoveProduct = (id) => {
    setDiscountData({
      ...discountData,
      products: discountData.products.filter(productId => productId !== id),
    });
  };

  // Xử lý khi thêm giảm giá
  const handleAddDiscount = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error('Không tìm thấy User ID.');
      setMessage('Lỗi: Không tìm thấy User ID.');
      return;
    }

    const updatedDiscountData = {
      ...discountData,
      createdBy: userId,
    };

    const formData = new FormData();
    formData.append('title', updatedDiscountData.title);
    formData.append('percentage', updatedDiscountData.percentage);
    formData.append('startDate', updatedDiscountData.startDate);
    formData.append('endDate', updatedDiscountData.endDate);
    formData.append('products', updatedDiscountData.products);
    if (updatedDiscountData.image) {
      formData.append('image', updatedDiscountData.image);
    }
    formData.append('createdBy', updatedDiscountData.createdBy); // Thêm createdBy vào formData

    try {
      const response = await axiosInstance.post('/discount/createDiscount', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Giảm giá đã được thêm thành công!');
      fetchDiscounts();
      setDiscountData({ title: '', percentage: '', startDate: '', endDate: '', image: null, products: [],createdBy:userId });
    } catch (error) {
      console.error('Lỗi khi thêm giảm giá:', error);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={4}>
          <h2>Thêm giảm giá</h2>
          <Form onSubmit={handleAddDiscount}>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề giảm giá</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tiêu đề giảm giá"
                name="title"
                value={discountData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phần trăm giảm giá</Form.Label>
              <Form.Control
                type="number"
                placeholder="Phần trăm giảm giá"
                name="percentage"
                value={discountData.percentage}
                onChange={handleInputChange}
                min="0"
                max="100"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ngày bắt đầu</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={discountData.startDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ngày kết thúc</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={discountData.endDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Chọn hình ảnh */}
            <Form.Group className="mb-3">
              <Form.Label>Chọn hình ảnh</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={(e) => setDiscountData({ ...discountData, image: e.target.files[0] })}
              />
            </Form.Group>

            {/* Chọn sản phẩm */}
            <Form.Group className="mb-3">
              <Form.Label>Chọn sản phẩm</Form.Label>
              <ul>
                {products.map((product) => (
                  <li key={product._id}>
                    {product.name} <Button variant="link" onClick={() => handleAddProduct(product._id)}>Thêm</Button>
                  </li>
                ))}
              </ul>
            </Form.Group>

            {/* Hiển thị sản phẩm đã chọn */}
            <Form.Group className="mb-3">
              <Form.Label>Sản phẩm đã chọn</Form.Label>
              <ul>
                {discountData.products.map((productId, index) => (
                  <li key={index}>
                    {productId} <Button variant="link" onClick={() => handleRemoveProduct(productId)}>Xóa</Button>
                  </li>
                ))}
              </ul>
            </Form.Group>

            <Button type="submit">Thêm giảm giá</Button>
          </Form>
          {message && <p className="mt-3">{message}</p>}
        </Col>

        <Col md={8}>
          <h2>Danh sách giảm giá</h2>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
              <th>Tên người tạo giảm giá</th>

                <th>Tiêu đề</th>
                <th>Phần trăm</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Sản phẩm</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((discount) => (
                <tr key={discount._id}>
                        <td>{discount.createdBy.name} </td> {/* Hiển thị tên người tạo */}


                  <td>{discount.title}</td>
                  <td>{discount.percentage}%</td>
                  <td>{new Date(discount.startDate).toLocaleDateString()}</td>
                  <td>{new Date(discount.endDate).toLocaleDateString()}</td>
                  <td>
  {discount.products && discount.products.length > 0 ? (
    discount.products.map((productId) => {
      // Tìm sản phẩm theo productId trong mảng products
      return productId ? (
        <div key={productId._id}>{productId.name}</div> // In ra tên sản phẩm nếu tìm thấy
      ) : (
        <div key={productId._id}>Sản phẩm không tồn tại</div> // Thông báo nếu không tìm thấy sản phẩm
      );
    })
  ) : (
    'Chưa gán sản phẩm'
  )}
</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => (discount._id)}
                    >
                      Xóa
                    </Button>
                    <Button
  variant="primary"
  onClick={() => handleUpdateDiscount(discount)}
>
  Cập nhật
</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <ModdalDiscount
  show={modalShow}
  onHide={() => setModalShow(false)}
  discount={currentDiscount}
  fetchDiscounts={fetchDiscounts}
  products={products}
/>
    </Container>
  );
}

export default Discounts;
