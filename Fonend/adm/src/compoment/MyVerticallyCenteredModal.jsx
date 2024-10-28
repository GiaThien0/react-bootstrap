import React from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {
  const {
    show,
    onHide,
    validated,
    setValidated, // Nhận setValidated từ props
    handleUpdateUser,
  } = props;

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true); // Sử dụng setValidated

    if (form.checkValidity()) {
      handleUpdateUser(); // Gọi hàm cập nhật người dùng
      onHide(); // Đóng modal
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cập nhật thông tin người dùng
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col md={4}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* Các trường Form ở đây */}
            <Row className="mb-3">
              <Form.Group controlId="validationCustom01">
                <Form.Label>Tên</Form.Label>
                <Form.Control required type="text" placeholder="Tên" />
                <Form.Control.Feedback type="invalid">
                  Bạn chưa điền tên
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit">Cập nhật</Button>
          </Form>
        </Col>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
