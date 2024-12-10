import React, { useEffect, useState } from 'react';
import StarRating from './StarRating';
import { Alert, Button, Form } from 'react-bootstrap';
import axiosInstance from '../../utils/aiosConfig';
import { FaBullseye, FaCrosshairs, FaStar } from 'react-icons/fa';

function Review({ email, userId, productId }) {
    const [rating, setRating] = useState(0); // Lưu giá trị số sao
    const [comment, setComment] = useState(''); // Lưu nội dung bình luận
    const [loading, setLoading] = useState(false); // Sử dụng state loading
    const [message, setMessage] = useState(''); // State để hiển thị thông báo sau khi gửi đánh giá
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
          try {
            const response = await axiosInstance.get(`/review/getrewiew/${productId}`); // Gọi API để lấy bình luận của sản phẩm
            setReviews(response.data);
          } catch (error) {
            setError('Error fetching reviews: ' + error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchReviews();
      }, [productId]);


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

    if(error){
        <div>
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: '#2f4f4f' }}>
      {/* Mục tiêu, bạn có thể thay đổi màu sắc và kích thước */}
      <FaCrosshairs style={{ marginRight: '10px', color: '#ff4500' }} /> 
      <FaBullseye style={{ color: '#ff6347' }} /> {/* Biểu tượng mục tiêu */}
    </div>
        </div>
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
          // Gửi đánh giá mới
          await axiosInstance.post('/review/reviewdata', {
              userId,      // ID người dùng
              email,       // Email người dùng
              rating,      // Điểm đánh giá (sao)
              comment,     // Nội dung bình luận
              productId,
          });
  
          // Cập nhật lại thông báo sau khi gửi đánh giá thành công
          setMessage('Đánh giá thành công!');
          setRating(0);
          setComment('');
  
          // Sau khi gửi thành công, tải lại danh sách đánh giá để hiển thị đánh giá mới
          const response = await axiosInstance.get(`/review/getrewiew/${productId}`);
          setReviews(response.data);
  
      } catch (error) {
          console.error('Error submitting review:', error);
          setMessage('Xin vui lòng đăng nhập trước khi thực hiện.');
      } finally {
          setLoading(false);
      }
  };
    
    return (
        <div className='mt-5'>
            <h2>Đánh giá sản phẩm</h2>
            <div>
                <Form onSubmit={handleSubmit}>
                    {/* Truyền hàm setRating vào StarRating */}
                    <StarRating onRatingChange={(value) => setRating(value)} />

                    <Form.Group className="mb-3 mt-5" controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Viết bình luận..."
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Đang gửi...' : 'Gửi'}
                    </Button>
                </Form>

                {/* Hiển thị thông báo khi gửi đánh giá */}
                {message && <div className="mt-3 alert alert-info">{message}</div>}
            </div>
            
            <div className="mt-5">
            { reviews.map((reviews) => (
                <div key={reviews.id}>
                     
                    <p><strong>Số sao:</strong>  {renderStars(reviews.rating)}</p>
                    <div className='d-flex '>
                        <p>{reviews.email}</p>

                        <p ><strong style={{marginLeft:'20px'}}>Bình luận:</strong> {reviews.comment}</p>
                    
                    
                    </div>
                   


               </div>
            ))}
             </div>
        </div>
        
    );
}

export default Review;
