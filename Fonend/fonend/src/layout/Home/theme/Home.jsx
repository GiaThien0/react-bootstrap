import React, {  useState } from 'react';
import CustomCarousels from '../../../Component/CustomCarousels/CustomCarousels';
import CustomListgroups from '../../../Component/CustomListgroups/CustomListgroups';
import { Container, Row, Col } from 'react-bootstrap';
import CustomProduc from '../../../Component/CustomProduc/CustomProduc';

import CustomCarouselcard from '../../../Component/CustomCarouselcard/CustomCarouselcard';

function Home() {

  
  const [selectedCategory, setSelectedCategory] = useState(null); // State cho danh mục đã chọn
 

  return (
    <Container className='bg-white'>
      <Row className='pt-5'>
        <Col md={3}>
          <CustomListgroups setSelectedCategory={setSelectedCategory} /> {/* Truyền setSelectedCategory */}
        </Col>
        <Col md={9}>
          <CustomCarousels selectedCategory={selectedCategory} /> {/* Truyền selectedCategory nếu cần */}
        </Col>
      </Row>
      <div className='mt-5'>
        
        <CustomProduc></CustomProduc>


      </div>
      <div className='mt-5'>

      
        <CustomCarouselcard></CustomCarouselcard>
 </div>
    </Container>
  );
}

export default Home;
