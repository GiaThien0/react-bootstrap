import React, { useState } from 'react';
import { Col, Container, Row, Offcanvas, Button } from 'react-bootstrap';
import CustomListgroups from '../../../Component/CustomListgroups/CustomListgroups';
import CustomCarouselcard from '../../../Component/CustomCarouselcard/CustomCarouselcard';
import { RxHamburgerMenu } from "react-icons/rx";

const Products = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [show, setShow] = useState(false);

    
    return (
        <Container className='mt-5 mb-5'>
            <Row>
                <Col md={2}>
                    <Button variant="primary" onClick={() => setShow(true)}>
                        <RxHamburgerMenu />
                        <span style={{ marginLeft: '8px' }}>Danh mục sản phẩm</span>
                    </Button>
                    <Offcanvas show={show} onHide={() => setShow(false)}>
                        <Offcanvas.Header closeButton />
                        <Offcanvas.Body>
                            <CustomListgroups setSelectedCategory={setSelectedCategory} />
                        </Offcanvas.Body>
                    </Offcanvas>
                </Col>
                <Col md={10} className='border-start'>
                    <CustomCarouselcard />
                </Col>
            </Row>
        </Container>
    );
};

export default Products;
