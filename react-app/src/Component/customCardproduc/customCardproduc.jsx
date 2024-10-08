import React from 'react'
import { Card,Button } from 'react-bootstrap';
import image3 from '../assets/hinh3.jpg';

function customCardproduc() {
  return (
    <Card>
        <Card.Img  variant="top" src={image3}/>

      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Text style={{color:"red"}}>
            Giá bán  :<span>1000đ</span>
        </Card.Text>
        <div className='d-flex'> 
        <Button variant="primary">Thêm vào giỏ hàng</Button>
        <Button variant="primary">Chi tiếc giỏ hàng</Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default customCardproduc
