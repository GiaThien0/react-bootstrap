import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../utils/aiosConfig';
import '../CustomListgroups/CustomListgroup.css';

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
        <div>
            <h2 className='text-center'><b>Danh mục sản phẩm</b></h2>
            <ListGroup>
                {categories.map((category) => (
                    <ListGroup.Item key={category._id} className='lista'>
                        <div
                            className="w-100 lista2"
                            onClick={() => handleCategoryClick(category._id)} // Gọi khi click vào danh mục
                        >
                            {category.name}
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default CustomListgroups;
