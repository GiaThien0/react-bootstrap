import React from 'react'
import { Container, Image, Nav, Navbar } from 'react-bootstrap'
import logo from '../../assats/logo.webp'
function navbar() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary ">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className='d-flex justify-content-between '>
        <Nav.Link href="/">Trang chủ</Nav.Link>

        <Nav.Link href="#home"><Image src={logo}  style={{width:'70px'}}    roundedCircle />
        </Nav.Link>


        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default navbar
