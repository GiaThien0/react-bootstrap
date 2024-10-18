import React from 'react'
import { Button } from 'react-bootstrap'
import { FcGoogle } from "react-icons/fc";

function Socialogin() {
  return (
    <Button className='border   w-100 '   
        style={{width:'100%' ,backgroundColor:'white',color:'black',fontSize:'20px'}}
        
     type="submit"
     ><FcGoogle style={{width:'30px', height:'30px'}}/>
                    <span style={{marginLeft:'10px'}} >Google</span> </Button>
  )
}

export default Socialogin
