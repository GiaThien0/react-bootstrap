import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import axiosInstance from '../utils/aiosConfig';
import BannerModal from '../compoment/BannerModal'; // Chỉnh sửa đường dẫn nếu cần

function Banner() {
  const [validated, setValidated] = useState(false);
  const [link, setLink] = useState('');
  const [position, setPosition] = useState('');
  const [section, setSection] = useState('');
  const [description, setDescription] = useState(''); // Thêm state cho description
  const [banners, setBanners] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axiosInstance.get('/banner/list');
      setBanners(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách banner:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/banner/delete/${id}`);
      fetchBanners();
    } catch (error) {
      console.error('Lỗi khi xóa banner:', error);
    }
  };

  const handleAddBanner = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', event.target.image.files[0]);
    formData.append('link', link);
    formData.append('position', position);
    formData.append('section', section);
    formData.append('description', description); // Thêm description

    try {
      const response = await axiosInstance.post('/banner/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Banner added:', response.data);
      fetchBanners();
      setErrorMessage('Bạn đã thêm banner thành công');
      setPreviewImage(null);
      setLink(''); // Reset lại giá trị input sau khi thêm thành công
      setPosition('');
      setSection('');
      setDescription('');
    } catch (error) {
      console.error('Error adding banner:', error);
      setErrorMessage('Có lỗi xảy ra khi thêm banner');
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    return form.checkValidity();
  };

  const handleBoth = (event) => {
    event.preventDefault();
    const isValid = handleSubmit(event);

    if (isValid) {
      handleAddBanner(event);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={4}>
          <Form noValidate validated={validated} onSubmit={handleBoth}>
            <Row className="mb-3">
              <Form.Group controlId="validationCustom01">
                <Form.Label>URL Hình Ảnh</Form.Label>
                <Form.Control
                  required
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                />
                <Form.Control.Feedback type="invalid">Bạn chưa điền URL hình ảnh</Form.Control.Feedback>
                {previewImage && (
                  <img src={previewImage} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />
                )}
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="validationCustom02">
                <Form.Label>Liên Kết</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Liên Kết"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">Bạn chưa điền liên kết</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="validationCustomUsername">
                <Form.Label>Vị Trí</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Vị Trí"
                  required
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">Bạn chưa điền vị trí</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="validationCustomSection">
                <Form.Label>Khu Vực</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Khu Vực"
                  required
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">Bạn chưa điền khu vực</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="validationCustomDescription">
                <Form.Label>Mô Tả</Form.Label>
                <Form.Control
                  as="textarea" // Sử dụng textarea thay vì input
                  rows={3} // Tạo nhiều dòng
                  placeholder="Mô Tả"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Button type="submit">Gửi biểu mẫu</Button>
          </Form>
          {errorMessage && <div className="alert alert-success mt-3">{errorMessage}</div>}
        </Col>
        <Col md={8}>
          <h1>Danh Sách Banner</h1>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Hình Ảnh</th>
                <th>Liên Kết</th>
                <th>Vị Trí</th>
                <th>Khu Vực</th>
                <th>Mô Tả</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
                <tr key={banner._id}>
                  <td>{banner._id}</td>
                  <td>
                    <img src={`http://localhost:4000/${banner.imageUrl}`} alt="Banner" style={{ width: '100px', height: 'auto' }} />
                  </td>
                  <td>{banner.link}</td>
                  <td>{banner.position}</td>
                  <td>{banner.section}</td>
                  <td style={{ whiteSpace: 'pre-wrap' }}>{banner.description}</td> {/* Hiển thị mô tả với hỗ trợ xuống dòng */}
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setCurrentBanner(banner);
                        setModalShow(true);
                      }}
                    >
                      Sửa
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(banner._id)}>
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
              <BannerModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                banner={currentBanner}
                fetchBanners={fetchBanners}
              />
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Banner;
