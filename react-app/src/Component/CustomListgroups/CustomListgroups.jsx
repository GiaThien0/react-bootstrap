import React from 'react'


import ListGroup from 'react-bootstrap/ListGroup';

function CustomListgroups() {
  return (
    <div className='border bg-light'>
        <p className='pt-2'>Danh sách sản phẩm</p>

    <ListGroup>
    <ListGroup.Item>Loại sản phẩm 1 </ListGroup.Item>
    <ListGroup.Item>Loại sản phẩm 1</ListGroup.Item>
    <ListGroup.Item>Loại sản phẩm 1</ListGroup.Item>
    <ListGroup.Item>Loại sản phẩm 1</ListGroup.Item>
    <ListGroup.Item>Loại sản phẩm 1</ListGroup.Item>
  </ListGroup>
  </div>

  )
}

export default CustomListgroups
