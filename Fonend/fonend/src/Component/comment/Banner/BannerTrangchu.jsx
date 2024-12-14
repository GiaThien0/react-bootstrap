import React from 'react'
import {  Col, Container, Row } from 'react-bootstrap'

function BannerTrangchu() {
  return (
    <Container fluid>
    <Row className="d-flex justify-content-between align-items-center">
      {/* Cột bên trái */}
      <Col xs={4} >
        <p>This is the left part of the banner.</p>
      </Col>

      {/* Cột bên phải */}
      <Col xs={4} >
        <p>This is the right part of the banner.</p>
      </Col>
    </Row>
  </Container>
  )
}

export default BannerTrangchu
