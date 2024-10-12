import React from 'react'
import '../CustomListgroups/CustomListgroup.css'

import ListGroup from 'react-bootstrap/ListGroup';

function CustomListgroups() {
  return (
    <div className='border bg-light'>
        <p className='pt-2 text-center'>Danh sách sản phẩm</p>

    <ListGroup>
    <ListGroup.Item><button className='w-100 lista'>sản phẩm 1</button></ListGroup.Item>
    <ListGroup.Item><button className='w-100 lista'>sản phẩm 1</button></ListGroup.Item>
    <ListGroup.Item><button className='w-100 lista'>sản phẩm 1</button></ListGroup.Item>
    <ListGroup.Item><button className='w-100 lista'>sản phẩm 1</button></ListGroup.Item>

  </ListGroup>
  </div>

  )
}

export default CustomListgroups
