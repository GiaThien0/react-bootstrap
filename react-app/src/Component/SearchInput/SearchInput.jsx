import React from 'react'
import { Form,Button,InputGroup } from 'react-bootstrap';

function SearchInput() {
  return (
    <Form>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                    />
                    <Button variant="success" type="submit" ><i class="bi bi-search"></i></Button>{' '}
                </InputGroup>
    </Form>
  )
}

export default SearchInput
