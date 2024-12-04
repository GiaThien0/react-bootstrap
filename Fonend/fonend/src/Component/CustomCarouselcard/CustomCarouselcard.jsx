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
    const searchQuery = searchParams.get('query');  // Lấy query (từ khóa tìm kiếm) từ URL

    useEffect(() => {
        // Nếu có searchQuery, gọi API tìm kiếm sản phẩm
        if (searchQuery) {
            fetchsearch();
        } 
        // Nếu không có searchQuery, gọi API tìm sản phẩm theo category
        else if (selectedCategory) {
            fetchcategory();
        }else {
            fetchAllProducts();
        }
    }, [selectedCategory, searchQuery]);
    const fetchcategory = async () => {
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
    const fetchsearch = async () => {
        try {
            // Gọi API tìm kiếm sản phẩm theo query (từ khóa tìm kiếm) và category (danh mục)
            const response = await axiosInstance.get('/products/search', {
                params: {
                    query: searchQuery  // Truyền từ khóa tìm kiếm nếu có
                }
                
            });

            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } 
    };
    const fetchAllProducts = async () => {
        try {
            const response = await axiosInstance.get('/category/listproduct');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
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
