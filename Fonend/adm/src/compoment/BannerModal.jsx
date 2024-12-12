import { useEffect, useState } from "react";
import axiosInstance from "../utils/aiosConfig";
import { Button, Modal, Form } from "react-bootstrap";

function BannerModal({ show, onHide, banner, fetchBanners }) {
  const [link, setLink] = useState(banner?.link || '');
  const [position, setPosition] = useState(banner?.position || '');
  const [section, setSection] = useState(banner?.section || '');
  const [description, setDescription] = useState(banner?.description || ''); // Tạo state cho description
  const [file, setFile] = useState(null); 
  const [previewImage, setPreviewImage] = useState(banner?.imageUrl || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    }
    formData.append('link', link);
    formData.append('position', position);
    formData.append('section', section);
    formData.append('description', description); // Thêm description

    try {
      await axiosInstance.put(`banner/update/${banner._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchBanners(); 
      onHide(); 
    } catch (error) {
      console.error("Lỗi khi cập nhật banner:", error);
    }
  };

  useEffect(() => {
    if (banner) {
      setLink(banner.link);
      setPosition(banner.position);
      setSection(banner.section);
      setDescription(banner.description); // Cập nhật description từ banner hiện tại
      setPreviewImage(banner.imageUrl); 
    }
  }, [banner]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setPreviewImage(URL.createObjectURL(file)); 
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sửa Thông Tin Banner</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile">
            <Form.Label>Hình Ảnh</Form.Label>
            <Form.Control
              type="file"
              onChange={handleImageChange} 
            />
            {previewImage && (
              <img src={`http://localhost:4000/${previewImage}`} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />
            )}
          </Form.Group>
          <Form.Group controlId="formLink">
            <Form.Label>Liên Kết</Form.Label>
            <Form.Control
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPosition">
            <Form.Label>Vị Trí</Form.Label>
            <Form.Control
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formSection">
            <Form.Label>Khu Vực</Form.Label>
            <Form.Control
              type="text"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Mô Tả</Form.Label>
            <Form.Control
              as="textarea" // Sử dụng thẻ textarea
              rows={3} // Số hàng hiển thị
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" className="mt-3">
            Lưu Thay Đổi
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BannerModal;
