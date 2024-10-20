import React from 'react'
import CustomCardproduc from '../CustomCardproduc/CustomCardproduc'

import '../CustomProduc/CustomProduc.css'
import { Button } from 'react-bootstrap'
function CustomProduc() {
  return (


    <div className='bg mt-5'>
          
            <Button className=' mt-2' style={{marginLeft:'20px'}} variant='danger'>2 NGÀY DEAL SỐC : GIẢM THÊM ĐẾN 500K</Button>
       
            <CustomCardproduc></CustomCardproduc>

              
    </div>
  )
}

export default CustomProduc
