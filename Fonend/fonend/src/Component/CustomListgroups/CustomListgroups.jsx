import React from 'react'
import './CustomListgroup.css'

import ListGroup from 'react-bootstrap/ListGroup';

function CustomListgroups() {
  return (
    <div className=''>
        <h2 className='text-center'><b>Danh mục sản phẩm</b></h2>
        <ListGroup className=''>
            <ListGroup.Item className='lista'>
                <a href="/product-1" className="w-100 lista2">Sản phẩm 1</a>
            </ListGroup.Item>
            <ListGroup.Item className='lista'>
                <a href="/product-1" className="w-100 lista2">Sản phẩm 1</a>
            </ListGroup.Item>
            
            <ListGroup.Item className='lista'>
                <a href="/product-1" className="w-100 lista2">Sản phẩm 1</a>
            </ListGroup.Item>
            
            <ListGroup.Item className='lista'>
                <a href="/product-1" className="w-100 lista2">Sản phẩm 1</a>
            </ListGroup.Item>
            
            <ListGroup.Item className='lista'>
                <a href="/product-1" className="w-100 lista2">Sản phẩm 1</a>
            </ListGroup.Item>
            
        </ListGroup>
   
  </div>

  )
}

export default CustomListgroups
