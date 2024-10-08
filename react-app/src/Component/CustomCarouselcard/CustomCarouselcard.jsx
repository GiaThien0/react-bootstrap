import React from 'react'
import { Container,Carousel,Card, Button,Col,Row } from 'react-bootstrap';
function CustomCarouselcard() {
  return (
    <Container className='mt-5 '>
        <h1 className='text-center mb-5'>Sản phẩm nổi bật</h1>
     <Carousel >
      {/* Slide 1 */}
      <Carousel.Item>
        <Row>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Product 1</Card.Title>
                <Card.Text>
                  This is a brief description of product 1.
                </Card.Text>
                <Button variant="primary">Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Product 2</Card.Title>
                <Card.Text>
                  This is a brief description of product 2.
                </Card.Text>
                <Button variant="primary">Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Product 3</Card.Title>
                <Card.Text>
                  This is a brief description of product 3.
                </Card.Text>
                <Button variant="primary">Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Product 3</Card.Title>
                <Card.Text>
                  This is a brief description of product 3.
                </Card.Text>
                <Button variant="primary">Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Carousel.Item>

      {/* Slide 2 */}
      <Carousel.Item>
        <Row>
        <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Product 3</Card.Title>
                <Card.Text>
                  This is a brief description of product 3.
                </Card.Text>
                <Button variant="primary">Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Product 4</Card.Title>
                <Card.Text>
                  This is a brief description of product 4.
                </Card.Text>
                <Button variant="primary">Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Product 5</Card.Title>
                <Card.Text>
                  This is a brief description of product 5.
                </Card.Text>
                <Button variant="primary">Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Product 6</Card.Title>
                <Card.Text>
                  This is a brief description of product 6.
                </Card.Text>
                <Button variant="primary">Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Carousel.Item>
    </Carousel>
  </Container>
  )
}

export default CustomCarouselcard
