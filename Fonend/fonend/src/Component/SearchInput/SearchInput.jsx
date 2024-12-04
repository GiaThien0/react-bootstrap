import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Dùng hook để chuyển hướng

function SearchInput() {
  const [searchQuery, setSearchQuery] = useState(''); // Lưu trữ từ khóa tìm kiếm
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // Ngừng hành động mặc định của form
    if (searchQuery.trim()) {
      navigate(`/Products/?query=${searchQuery.trim()}`); // Chuyển hướng đến trang sản phẩm với từ khóa tìm kiếm
    }
  };

  return (
    <Form className="w-100" onSubmit={handleSearch}>  {/* Cập nhật className để căn chỉnh chiều rộng */}
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật từ khóa tìm kiếm
          className="mr-sm-2 h-25"  // Giữ lại kiểu dáng cho input
        />
        <Button variant="danger" type="submit">
          <i className="bi bi-search"></i> {/* Sử dụng icon tìm kiếm */}
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchInput;
