import React, { useState } from 'react';
import StarRating from './StarRating';
import { Button, Form } from 'react-bootstrap';

function Review({ onSubmit,email ,userId}) {
    const [rating, setRating] = useState(0); // Lưu giá trị số sao
    const [comment, setComment] = useState(''); // Lưu nội dung bình luận

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ rating, comment,email,userId }); // Gửi dữ liệu đánh giá (rating + comment) ra ngoài
    };

    return (
        <div className='mt-5'>
            <h2>Đánh giá sản phẩm</h2>
            <div>
                <Form onSubmit={handleSubmit}>
                    {/* Truyền hàm setRating vào StarRating */}
                    <StarRating onRatingChange={(value) => setRating(value)} />

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Viết bình luận..."
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Review;
