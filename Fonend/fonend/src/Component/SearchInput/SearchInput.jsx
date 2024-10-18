import React from 'react'
import { Form,Button,InputGroup } from 'react-bootstrap';

function SearchInput() {
  return (
    <Form>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Tìm kiếm"
                        className="mr-sm-2 "
                    />
                    <Button  variant="danger" type="submit" ><span><i class="bi bi-search"></i></span></Button>{' '}
                </InputGroup>
    </Form>
  )
}

export default SearchInput
