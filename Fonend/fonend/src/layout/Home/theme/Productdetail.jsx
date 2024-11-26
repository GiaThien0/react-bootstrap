import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom'; 
import axiosInstance from '../../../utils/aiosConfig'; 
import './Productdetail.css';
import Review from '../../../Component/comment/Review';
function Productdetail() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const [userId,setuserid] = useState(null)
  // Thêm state cho số lượng sản phẩm
  const [quantity, setQuantity] = useState(1);
  const [reviewData, setReviewData] = useState(null); // State để lưu dữ liệu đánh giá
  const [email, setemail] = useState(null); // State để lưu dữ liệu đánh giá


  const handleReviewSubmit = (data) => {

    setReviewData( data);
    // Thêm logic xử lý: lưu vào cơ sở dữ liệu, gọi API...
};
  const addToCart = async () => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }
  
    try {
      const response = await axiosInstance.post('cart/addcart', {
        userId, // Đảm bảo rằng `userid` được truyền
        productId: id,
        quantity,
      });
      console.log(response.data.message); // Thông báo thành công
      console.log(response.data.cart); // Chi tiết giỏ hàng cập nhật
      navigate('/Card'); // Điều hướng đến trang giỏ hàng
    } catch (error) {
      console.error('Error adding product to cart:', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`products/getproducts/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    console.log(id)
  
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/auth/adm/userdata', { withCredentials: true });
        const { id,email } = response.data.user;
        setuserid(id); // Lưu id người dùng vào state
        setemail(email)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    

    fetchProduct(); // Lấy thông tin sản phẩm
    fetchUserData(); // Lấy thông tin người dùng
  }, [id]); // Chạy lại khi `id` thay đổi







  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;
  const renderStars = (rating) => {
    return (
        <div style={{ display: 'flex' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                    key={star}
                    size={30}
                    color={star <= rating ? "#FFD700" : "#ccc"} // Vàng khi được chọn, xám khi chưa
                />
            ))}
        </div>
    );
};
  return (
    <Container className='mt-5'>
      <Row>
        <Col md={7} >
        <div className='card-hover text-center'>
          <Image  src={`http://localhost:4000/${product.image}`} alt="Hình chính" fluid /> 
          </div>
         
        </Col>






        <Col md={5}>
          <Card.Text className='fs-2'>{product.name}</Card.Text> 
          <span className='d-flex'>
            <FaStar style={{ color: 'gold', fontSize: '1.3rem' }} />
            <FaStar style={{ color: 'gold', fontSize: '1.3rem' }} />
            <FaStar style={{ color: 'gold', fontSize: '1.3rem' }} />
            <FaStarHalf style={{ color: 'gold', fontSize: '1.3rem' }} />
            <p style={{ color: 'Silver' }}>đã bán {product.sold}</p> 
          </span>
          <Card.Text>{product.description}</Card.Text>
          <h2 style={{ color: 'red' }} className='mt-2'>
            <span className="fw-bold underline">{product.price.toLocaleString('vi-VN')} đ</span> 
          </h2>
          <div className='d-flex gap-3'>
            <p>Giao đến <span className="fw-bold">q1 , P,Bến Nghé, Hồ Chí Minh</span></p>
            <a href="/">Giao đến</a>
          </div>
          <hr />
          <p>Số lượng</p>
          <div className='d-flex gap-2 justify-content-center' style={{ backgroundColor: '#EEEEEE' }}>
            <Button className='custom-button' onClick={() => setQuantity(quantity + 1)}>+</Button>
            <p>{quantity}</p>
            <Button className='custom-button' onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</Button>
          </div>
          <hr />
          <div className='d-flex gap-5'>
            <Button className='w-50 custom-buttonred' onClick={addToCart}>Chọn mua</Button>
            <Button className='w-50 custom-buttonblue'>Mua trả sau</Button>
          </div>
        </Col>
      </Row>

      <Row >
        <Col md={7}>
      <Review onSubmit={handleReviewSubmit} email={email} userId={userId}>  </Review>
          {reviewData && (
                <div className="mt-5">
                    <p><strong>Số sao:</strong>  {renderStars(reviewData.rating)}</p>
                    <p><strong>Bình luận:</strong> {reviewData.comment}</p>
                    <p>{email}</p>
                </div>
            )}

</Col>
<Col></Col>
            </Row>

         


    </Container>
  );
}

export default Productdetail;
