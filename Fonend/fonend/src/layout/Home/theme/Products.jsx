// Products.js
import React, {  useState } from 'react';
import {  Col, Container, Row ,Offcanvas,Button} from 'react-bootstrap';
import CustomListgroups from '../../../Component/CustomListgroups/CustomListgroups';
import CustomCarouselcard from '../../../Component/CustomCarouselcard/CustomCarouselcard';

import { RxHamburgerMenu } from "react-icons/rx";

const Products = () => {
    const [selectedCategory, setSelectedCategory] = useState(null); // Bắt đầu không có danh mục nào được chọn

    // Cập nhật selectedCategory từ customListgroups
    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Container className='mt-5 mb-5'>
            <Row>
                <Col md={2}>
                <Button variant="primary" onClick={handleShow}>
                <RxHamburgerMenu />
                <span style={{marginLeft:'8px'}}>Danh mục sản phẩm</span>
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <CustomListgroups setSelectedCategory={handleCategorySelect} />
        </Offcanvas.Body>
      </Offcanvas>
                  
                </Col>
                <Col md={10} className='border-start'>
                    <CustomCarouselcard selectedCategory={selectedCategory} />
                </Col>
            </Row>
        </Container>
    );
}

export default Products;
