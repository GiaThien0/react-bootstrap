import React, { useEffect, useState } from 'react';
import { Button, Row, Form, Container, Col, Table, Image } from 'react-bootstrap';
import axiosInstance from '../utils/aiosConfig';
import Moddalproducts from '../compoment/Moddalproducts';

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '', // Thêm trường stock
  });
  
  
  const [modalShow, setModalShow] = React.useState(false);
const [currentProducts, setCurrentProducts] = useState(null);
const [categoryName, setCategoryName] = useState('');
const [message, setMessage] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);


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
    if (name === "stock" && value < 0) {
      return; // Nếu là số âm thì không thay đổi giá trị
    }
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
    formData.append('stock', productData.stock);

    try {
        const response = await axiosInstance.post('/products/addproductsadmin', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Sản phẩm đã được thêm:', response.data);
        alert('sản phẩm đã dc thêm vào')

        fetchProducts();
      } catch (error) {
        console.error('Lỗi khi tải lên:', error.response ? error.response.data : error.message);
        alert('bạn nhập sai dữ liệu sản phẩm cần loại bỏ dấu . trong giá tiền và chọn loại sản phẩm khi click vào hoặc chưa có hình ảnh.');

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


const handleAddCategory = async (event) => {
  event.preventDefault();

  try {
      const response = await axiosInstance.post('/category/addcategory', { name: categoryName });
      setMessage(response.data.message);
      setCategoryName(''); // Xóa tên loại sản phẩm sau khi thêm thành công
      fetchCategories();
  } catch (error) {
      console.error('Lỗi khi thêm loại sản phẩm:', error);
      setMessage(error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
  }
};



const handleDeleteCategory = async (event) => {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của biểu mẫu

  if (!selectedCategory) {
      setMessage('Vui lòng chọn loại sản phẩm để xóa.');
      return;
  }

  try {
      const response = await axiosInstance.delete(`/category/deletecategory/${selectedCategory}`); // Đường dẫn API tương ứng
      setMessage(response.data.message);
      fetchCategories(); // Cập nhật lại danh sách sau khi xóa
  } catch (error) {
      console.error('Lỗi khi xóa loại sản phẩm:', error);
      setMessage('Có lỗi xảy ra khi xóa loại sản phẩm');
  }
};

  return (
    <Container fluid>
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
            <Row className="">
  <Form.Group controlId="validationCustomStock">
    <Form.Label>Số lượng trong kho</Form.Label>
    <Form.Control
      required
      type="number"
      placeholder="Số lượng"
      name="stock"
      value={productData.stock}
      onChange={handleInputChange}
      min="0" // Đảm bảo không có số âm

    />
    <Form.Control.Feedback type="invalid">
      Bạn chưa điền số lượng sản phẩm
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

            <div className='pt-5'>
            <Form onSubmit={handleAddCategory} className='pt-3'>
            <Row className="pt-3">
              <Form.Group controlId="validationCustom01" >
                <Form.Label>Tên loại sản phẩm</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Tên loại sản phẩm"
                  name="name"
                  value={categoryName}
                 onChange={(e) => setCategoryName(e.target.value)}
                  className="mt-3"
                />
                
              </Form.Group>
            </Row>
                <Button type="submit" className="mt-3">Thêm</Button >
            </Form>
            {message && <p>{message}</p>}



            </div>
            <div>
            <Form onSubmit={handleDeleteCategory}> 
                <Row className="mb-3">
                    <Form.Label>Xóa Loại Sản Phẩm</Form.Label>
                    <Form.Group controlId="categorySelect">
                        <Form.Select
                            aria-label="Chọn loại sản phẩm"
                            name="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)} // Cập nhật giá trị đã chọn
                        >
                            <option value="" disabled hidden>Loại sản phẩm</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">Xác Nhận</Button>
            </Form>
            {message && <p>{message}</p>} {/* Hiển thị thông báo nếu có */}
        </div>



        </Col>
        <Col md={8}>
          <h1>Danh Sách Sản Phẩm</h1>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
              <th>id sản phẩm</th>

                <th>Hình</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Giới thiệu</th>

                <th>Loại sản phẩm</th>
                <th>Số lượng trong kho</th>

                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>
                    <Image src={`http://localhost:4000/${product.image}`} className="w-25 pt-5" rounded />
                  </td>
                  <td className="pt-5">{product.name}</td>
                  <td className="pt-5">{product.price.toLocaleString()}</td>
                  <td className="pt-5">{product.description}</td>
                  <td className="pt-5">{product.category.name}</td>
                  <td className="pt-5">{product.stock}</td>

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
