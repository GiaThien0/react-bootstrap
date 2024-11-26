import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function StarRating({ onRatingChange }) {
    const [rating, setRating] = useState(0); // Giá trị số sao được chọn

    const handleRating = (star) => {
        setRating(star); // Cập nhật giá trị sao trong component này
        if (onRatingChange) {
            onRatingChange(star); // Gửi giá trị sao lên component cha
        }
    };

    return (
        <div style={{ display: 'flex', cursor: 'pointer' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                    key={star}
                    size={30}
                    color={star <= rating ? "#FFD700" : "#ccc"} // Vàng khi được chọn, xám khi chưa
                    onClick={() => handleRating(star)} // Click để chọn sao
                />
            ))}
        </div>
    );
}

export default StarRating;
