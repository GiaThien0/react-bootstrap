import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, Table } from 'react-bootstrap';
import axiosInstance from '../utils/aiosConfig';

function AssignDiscount() {
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [discounts, setDiscounts] = useState([]); // Danh sách giảm giá
  const [selectedDiscount, setSelectedDiscount] = useState(null); // Giảm giá đã chọn
  const [selectedProducts, setSelectedProducts] = useState([]); // Sản phẩm đã chọn

  // Lấy danh sách sản phẩm và giảm giá khi trang được tải
  useEffect(() => {
    fetchProducts();
    fetchDiscounts();
  }, []);

  // Lấy danh sách sản phẩm từ server
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products/getproducts');
      setProducts(response.data); // Cập nhật danh sách sản phẩm
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error);
    }
  };

  // Lấy danh sách giảm giá từ server
  const fetchDiscounts = async () => {
    try {
      const response = await axiosInstance.get('/discount/getAllDiscounts');
      setDiscounts(response.data); // Cập nhật danh sách giảm giá
      console.log("Sản phẩm:", discounts);
    } catch (error) {
      console.error('Lỗi khi lấy giảm giá:', error);
    }
    
  };

  // Hàm để gán giảm giá cho các sản phẩm
  const handleAddProductToDiscount = async () => {
    try {
      await axiosInstance.post('/discount/assignDiscountToProducts', {
        discountId: selectedDiscount,
        productIds: selectedProducts,
      });
      alert('Giảm giá đã được gán cho sản phẩm!');
      // Tải lại danh sách giảm giá sau khi gán
      fetchDiscounts();
    } catch (error) {
      console.error('Lỗi khi gán giảm giá:', error);
    }
  };

  return (
    <Container>
      <Row>
        {/* Phần nhập liệu và chọn sản phẩm để gán giảm giá */}
        <Col md={6}>
          <h2>Gán giảm giá cho sản phẩm</h2>
          <Form>
            <Form.Group>
              <Form.Label>Chọn giảm giá</Form.Label>
              <Form.Control as="select" onChange={(e) => setSelectedDiscount(e.target.value)}>
                <option value="">Chọn giảm giá</option>
                {discounts.map((discount) => (
                  <option key={discount._id} value={discount._id}>
                    {discount.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Chọn sản phẩm</Form.Label>
              <ul>
                {products.map((product) => (
                  <li key={product._id}>
                    <input
                      type="checkbox"
                      value={product._id}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProducts([...selectedProducts, product._id]);
                        } else {
                          setSelectedProducts(selectedProducts.filter(id => id !== product._id));
                        }
                      }}
                    />
                    {product.name}
                  </li>
                ))}
              </ul>
            </Form.Group>

            <Button onClick={handleAddProductToDiscount}>Gán giảm giá</Button>
          </Form>
        </Col>

        {/* Phần hiển thị danh sách các giảm giá đã tạo */}
        <Col md={6}>
          <h2>Danh sách giảm giá đã tạo</h2>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Phần trăm</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Sản phẩm</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((discount) => (
                <tr key={discount._id}>
                  <td>{discount.title}</td>
                  <td>{discount.percentage}%</td>
                  <td>{new Date(discount.startDate).toLocaleDateString()}</td>
                  <td>{new Date(discount.endDate).toLocaleDateString()}</td>
                  <td>
  {discount.products && discount.products.length > 0 ? (
    discount.products.map((productId) => {
      // Tìm sản phẩm theo productId trong mảng products
      const product = products.find(p => p._id === productId._id); // Kiểm tra theo _id, vì productId trong discount có thể là đối tượng
      return product ? (
        <div key={productId._id}>{product.name}</div> // In ra tên sản phẩm nếu tìm thấy
      ) : (
        <div key={productId._id}>Sản phẩm không tồn tại</div> // Thông báo nếu không tìm thấy sản phẩm
      );
    })
  ) : (
    'Chưa gán sản phẩm'
  )}
</td>

                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default AssignDiscount;
