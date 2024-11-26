import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import axiosInstance from '../../utils/aiosConfig';

const CustomCarouselcard = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    
    // Lấy tham số 'category' từ query string trong URL
    const searchParams = new URLSearchParams(location.search);
    const selectedCategory = searchParams.get('category'); // Lấy category từ URL

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Truyền tham số 'category' vào nếu có, nếu không có thì sẽ lấy tất cả sản phẩm
                const response = await axiosInstance.get('/category/listproduct', {
                    params: { category: selectedCategory }
                });
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [selectedCategory]);  // Dữ liệu sẽ được tải lại khi selectedCategory thay đổi

    return (
        <Container>
            <Row>
                {products.length > 0 ? (
                    products.map((product) => (
                        <Col md={3} key={product._id} className="d-flex mb-5">
                            <Link to={`/Productdetail/${product._id}`} className="card-hover w-100">
                                <Card className="product-card d-flex flex-column h-100">
                                    <Card.Img variant="top" src={`http://localhost:4000/${product.image}`} />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title style={{ color: 'black', fontSize: '15px' }}>{product.name}</Card.Title>
                                        <Card.Text style={{ color: "red" }}>
                                            Giá bán: <span>{product.price.toLocaleString('vi-VN')} đ</span>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))
                ) : (
                    <div>Không có sản phẩm nào để hiển thị.</div>
                )}
            </Row>
        </Container>
    );
};

export default CustomCarouselcard;
