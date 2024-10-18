import React from 'react'
import { Card } from 'react-bootstrap';
import image3 from '../assets/hinh3.jpg';
import { Link } from 'react-router-dom';
import './customCardproduc.css'
function customCardproduc() {
  return (
    <Link to="/your-link" className="card-hover ">

    <Card className=''>

    
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
        

       
        </div>
      </Card.Body>
    </Card>
    </Link>

  )
}

export default customCardproduc
