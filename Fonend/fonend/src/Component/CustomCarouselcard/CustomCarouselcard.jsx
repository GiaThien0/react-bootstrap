import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/aiosConfig';

const CustomCarouselcard = ({ selectedCategory }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Đặt loading về true trước khi gọi API
            try {
                const endpoint = selectedCategory 
                    ? `/category/category/${selectedCategory}`:'products/getproducts'; 
                const response = await axiosInstance.get(endpoint);
                setProducts(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // Đặt loading về false sau khi gọi API xong
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container>
            <Row>
                {products.map((product) => (
                    <Col md={3} key={product._id} className="d-flex mb-5">
                        <Link to={`/Productdetail/${product._id}`} className="card-hover w-100">
                            <Card className="product-card d-flex flex-column h-100">
                                <Card.Img variant="top" src={product.image} />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title style={{ color: 'black', fontSize: '15px' }}>{product.name}</Card.Title>
                                    <Card.Text style={{ color: "red" }}>
                                        Giá bán: <span>{product.price.toLocaleString('vi-VN')} đ</span>
                                    </Card.Text>
                                    <Card.Img variant="top" src=" https://cdn-v2.didongviet.vn/files/default/2024/9/17/0/1729122848588_label_02.jpg" className="pt-2" />

                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default CustomCarouselcard;
