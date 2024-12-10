import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

function Address() {
  return (
    <Container className="mt-5">
      <Row>
        {/* Thông tin địa chỉ */}
        <Col md={6}>
          <Card>
            <Card.Header>Địa chỉ công ty</Card.Header>
            <Card.Body>
              <Card.Title>Công ty XYZ</Card.Title>
              <Card.Text>
                123 Đường ABC, Phường XYZ, Quận 1, TP.HCM, Việt Nam
              </Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item>Email: contact@xyz.com</ListGroup.Item>
                <ListGroup.Item>Điện thoại: 0901234567</ListGroup.Item>
                <ListGroup.Item>Website: www.xyz.com</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Bản đồ */}
        <Col md={6}>
          <Card>
            <Card.Header>Bản đồ</Card.Header>
            <Card.Body>
              <div className="map-container">
                {/* Sử dụng Google Maps hoặc bất kỳ dịch vụ bản đồ nào bạn thích */}
                <iframe
                  width="100%"
                  height="300"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.073579356956!2d106.69769321479845!3d10.766444261972026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752e9ad74db35d%3A0x2a6502d4786a4895!2zMTIzIFQgQuG6oWNoLCBRdWFuIDE!5e0!3m2!1sen!2s!4v1617006180191!5m2!1sen!2s"
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Address;
