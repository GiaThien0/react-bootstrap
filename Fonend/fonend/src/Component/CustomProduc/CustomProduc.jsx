import React from 'react'


import '../CustomProduc/CustomProduc.css'
import { Button } from 'react-bootstrap'
import CustomCardproduc from '../CustomCardproduc/CustomCardproduc'
function CustomProduc() {
  return (


    <div className='bg mt-5'>
          
            <Button className=' mt-2' style={{marginLeft:'20px',marginBottom:'20px'}} variant='danger'>2 NGÀY DEAL SỐC : GIẢM THÊM ĐẾN 500K</Button>

           <CustomCardproduc></CustomCardproduc>

              
    </div>
  )
}

export default CustomProduc
