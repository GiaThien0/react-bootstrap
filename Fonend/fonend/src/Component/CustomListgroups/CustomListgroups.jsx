import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/aiosConfig';
import './CustomListgroup.css'; // Đảm bảo đã thêm đúng đường dẫn CSS

const CustomListgroups = ({ setSelectedCategory }) => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    // Fetch categories khi component load
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/category/getcategory');
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // Xử lý khi người dùng click vào danh mục
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        navigate(`/Products/?category=${category}`);
    };

    return (
        <div className="category-list-container">
            <h2 className="text-center category-title">Danh mục sản phẩm</h2>
            <ListGroup className="category-list">
                {categories.map((category) => (
                    <ListGroup.Item
                        key={category._id}
                        className="category-item"
                        onClick={() => handleCategoryClick(category._id)}
                    >
                        {category.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default CustomListgroups;
