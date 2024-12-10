import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SearchIput.css'; // Nhớ liên kết với file CSS của bạn

function SearchInput() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/Products/?query=${searchQuery.trim()}`);
    }
  };

  return (
    <Form className="search-form" onSubmit={handleSearch}>
      <InputGroup className="search-input-group">
        <Form.Control
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button 
          variant="danger" 
          type="submit" 
          className="search-button" // Custom button class
        >
          <i className="bi bi-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchInput;
