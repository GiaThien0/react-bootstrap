import mongoose, { Schema } from 'mongoose';

// Định nghĩa schema cho Product
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    reviews: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Review'
    }],
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    discount: {  // Trường mới để lưu thông tin giảm giá
        type: Schema.Types.ObjectId,
        ref: 'Discount', // Liên kết với bảng Discount
    },
});


// Tạo model từ schema
const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;
