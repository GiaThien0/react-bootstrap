// CustomListgroups.js
import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/aiosConfig';
import '../CustomListgroups/CustomListgroup.css';




const CustomListgroups = ({ setSelectedCategory }) => {
    const [categories, setCategories] = useState([]);

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

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId); // Cập nhật danh mục đã chọn
    };

    return (
        <div>
            <h2 className='text-center'><b>Danh mục sản phẩm</b></h2>
            <ListGroup>
                {categories.map((category) => (
                    <ListGroup.Item key={category._id} className='lista'>
                        <Link 
                            to={`/products`} 
                            className="w-100 lista2"  
                            onClick={() => handleCategoryClick(category._id)}
                        >
                            {category.name}
                        </Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default CustomListgroups;
