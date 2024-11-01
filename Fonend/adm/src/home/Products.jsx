import React, { useEffect, useState } from 'react';
import { Button, Row, Form, Container, Col, Table, Image } from 'react-bootstrap';
import axiosInstance from '../utils/aiosConfig';
import Moddalproducts from '../compoment/Moddalproducts';

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
const [productData, setProductData] = useState({name: '',price: '',description: '',category: ''});
const [modalShow, setModalShow] = React.useState(false);
const [currentProducts, setCurrentProducts] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);


  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/category/getcategory'); // Đường dẫn API
      setCategories(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách loại sản phẩm:', error);
    }
  };


  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products/getproducts');
      setProducts(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Submit form to add product to MongoDB
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('description', productData.description);
    formData.append('category', productData.category);
    formData.append('image', selectedImage); // Sử dụng selectedImage đã được lưu trữ

    try {
        const response = await axiosInstance.post('/products/addproductsadmin', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Sản phẩm đã được thêm:', response.data);
        fetchProducts();
      } catch (error) {
        console.error('Lỗi khi tải lên:', error.response ? error.response.data : error.message);
      }
};
const deleteProduct = async (id) => {
  try {
    await axiosInstance.delete(`/products/deteleproducts/${id}`);
    // Cập nhật lại danh sách sản phẩm sau khi xóa
    setProducts(products.filter((product) => product._id !== id));
    alert('Sản phẩm đã được xóa thành công!');
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    alert('Không thể xóa sản phẩm. Vui lòng thử lại.');
  }
};




  return (
    <Container >
      <Row>
        <Col md={4}>
          <Form onSubmit={handleSubmit}>
            <Row className="">
              <Form.Group controlId="validationCustom01">
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Tên sản phẩm"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Bạn chưa điền tên sản phẩm
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="">
              <Form.Group controlId="validationCustom02">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Giá"
                  name="price"
                  value={productData.price}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Bạn chưa điền giá
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="">
              <Form.Group controlId="validationCustom02">
                <Form.Label>Giới thiệu</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Giới thiệu"
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Bạn chưa điền giới thiệu
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Hình Ảnh</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
              </Form.Group>
              {preview && (
                <div className="mb-3">
                  <Image src={preview} alt="Preview" thumbnail width="200" />
                </div>
              )}
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="roleSelect">
                <Form.Select
                  aria-label="Select Role"
                  name="category"
                  value={productData.category}
                  onChange={handleInputChange}
                >
                   <option value="" disabled hidden>loại sản phẩm</option>
    {categories.map((category) => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <Button type="submit">Gửi biểu mẫu</Button>
          </Form>
        </Col>
        <Col md={8}>
          <h1>Danh Sách Sản Phẩm</h1>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>Hình</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Giới thiệu</th>
                <th>Loại sản phẩm</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <Image src={`http://localhost:4000/${product.image}`}className="w-25 pt-5" rounded />
                  </td>
                  <td className="pt-5">{product.name}</td>
                  <td className="pt-5">{product.price.toLocaleString()}</td>
                  <td className="pt-5">{product.description}</td>
                  <td className="pt-5">{product.category.name}</td>
                  <td>
                    <Button variant="primary" className="mt-5" onClick={() => {setModalShow(true) 
                      setCurrentProducts(product)
                    }}>Sửa</Button>
                    <Button variant="danger" className="mt-5"  onClick={() => deleteProduct(product._id)}>Xóa</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Moddalproducts
        show={modalShow}
        onHide={() => setModalShow(false)}
        product = {currentProducts}
        fetchProducts={fetchProducts}
        categories={categories}  >        
        
        
        </Moddalproducts>
    </Container>
  );
}



export default Products
