import React, { useEffect, useState } from 'react';
import StarRating from './StarRating';
import { Alert, Button, Form, Card } from 'react-bootstrap';
import axiosInstance from '../../utils/aiosConfig';
import { FaStar } from 'react-icons/fa';

function Review({ email, userId, productId }) {
    const [rating, setRating] = useState(1); // Giá trị mặc định của rating là 1
    const [comment, setComment] = useState(''); // Lưu nội dung bình luận
    const [loading, setLoading] = useState(false); // Sử dụng state loading
    const [message, setMessage] = useState(''); // State để hiển thị thông báo sau khi gửi đánh giá
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const [parentReviewId, setParentReviewId] = useState(null); // State để lưu ID bình luận cha khi trả lời
    const [replyComment, setReplyComment] = useState(''); // State để lưu bình luận trả lời

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axiosInstance.get(`/review/getrewiew/${productId}`);
                setReviews(response.data);
            } catch (error) {
                setError('Error fetching reviews: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axiosInstance.post('/review/reviewdata', {
                userId,
                email,
                rating,
                comment,
                productId,
                parentReview: null,
            });

            setMessage('Đánh giá thành công!');
            setRating(1);
            setComment('');
            setParentReviewId(null);

            const response = await axiosInstance.get(`/review/getrewiew/${productId}`);
            setReviews(response.data);

        } catch (error) {
            console.error('Error submitting review:', error);
            setMessage('Xin vui lòng đăng nhập trước khi thực hiện.');
        } finally {
            setLoading(false);
        }
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axiosInstance.post('/review/reviewdata', {
                userId,
                email,
                comment: replyComment,
                productId,
                parentReview: parentReviewId,
            });

            setReplyComment('');
            setParentReviewId(null);

            const response = await axiosInstance.get(`/review/getrewiew/${productId}`);
            setReviews(response.data);

        } catch (error) {
            console.error('Error submitting review:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderStars = (rating) => (
        <div style={{ display: 'flex' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                    key={star}
                    size={30}
                    color={star <= rating ? "#FFD700" : "#ccc"}
                />
            ))}
        </div>
    );

    const renderReview = (review, isChild = false) => (
        <Card key={review._id} className="mb-3" style={{ marginLeft: isChild ? '20px' : '0px', borderLeft: isChild ? '2px solid #ccc' : 'none' }}>
            <Card.Body>
                <Card.Title>{review.email}</Card.Title>
                <Card.Text>{review.comment}</Card.Text>
                {review.rating > 0 && <div>{renderStars(review.rating)}</div>}
                {!isChild && <Button variant="link" onClick={() => setParentReviewId(review._id)}>Bình luận</Button>}
                {parentReviewId === review._id && (
                    <Form onSubmit={handleReplySubmit} className="mt-2">
                        <Form.Group controlId="replyComment">
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Viết bình luận trả lời..."
                                value={replyComment}
                                onChange={(e) => setReplyComment(e.target.value)}
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? 'Đang gửi...' : 'Gửi'}
                        </Button>
                    </Form>
                )}
                {review.comments && review.comments.map(childReview => (
                    <div key={childReview._id} className="ml-3 mt-2 border-left pl-3" style={{ marginLeft: '20px', borderLeft: '2px solid #ccc' }}>
                        <strong>{childReview.email}</strong> - {childReview.comment}
                    </div>
                ))}
            </Card.Body>
        </Card>
    );

    return (
        <div className='mt-5'>
            <h2>Đánh giá sản phẩm</h2>
            <div>
                <Form onSubmit={handleSubmit}>
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

                {message && <div className="mt-3 alert alert-info">{message}</div>}
            </div>
            
            <div className="mt-5">
                {reviews.map(review => renderReview(review))}
            </div>
        </div>
    );
}

export default Review;
