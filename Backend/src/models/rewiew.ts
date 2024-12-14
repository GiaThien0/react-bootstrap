import mongoose, { Schema } from 'mongoose';

// Định nghĩa schema cho Comment (bình luận con)
const CommentSchema = new Schema({
    userId: {
        type: String, // ID của người dùng thực hiện bình luận
        required: true,
    },
    email: {
        type: String, // Email người dùng thực hiện bình luận
        required: true,
    },
    comment: {
        type: String, // Nội dung bình luận con
        required: true,
    },
    date: {
        type: Date, // Ngày bình luận
        default: Date.now,
    },
});

// Định nghĩa schema cho Review
const ReviewSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId, // Liên kết với Product
        ref: 'Product', // Tham chiếu đến model Product
        required: true,
    },
    userId: {
        type: String, // ID của người dùng thực hiện đánh giá
        required: true,
    },
    email: {
        type: String, // Email người dùng
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address.'], // Kiểm tra định dạng email
    },
    rating: {
        type: Number, // Điểm đánh giá (1-5 sao)
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String, // Nội dung bình luận
        required: true,
    },
    date: {
        type: Date, // Ngày đánh giá
        default: Date.now,
    },
    // Thêm trường comments để lưu các bình luận con
    comments: [CommentSchema], // Mảng chứa các bình luận con
});

// Tạo model từ schema
const ReviewModel = mongoose.model('Review', ReviewSchema);
export default ReviewModel;
