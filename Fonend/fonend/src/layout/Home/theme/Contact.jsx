import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Contact() {
  return (
    <div className="contact-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} className="contact-form">
            <h2 className="text-center mb-4">Liên hệ với chúng tôi</h2>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control type="text" placeholder="Nhập họ và tên của bạn" />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Nhập email của bạn" />
              </Form.Group>

              <Form.Group controlId="formMessage">
                <Form.Label>Thông điệp</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Nhập thông điệp của bạn" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Gửi
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Contact;
