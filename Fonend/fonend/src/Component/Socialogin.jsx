import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { Button } from 'react-bootstrap'; // Import các component của react-bootstrap

function Socialogin() {
  return (
    
          <Button variant="outline-danger" className="w-100">
          <FcGoogle style={{fontSize:'25px'}}/> {/* Biểu tượng Google */}
           
          </Button>
      
  );
}

export default Socialogin;
