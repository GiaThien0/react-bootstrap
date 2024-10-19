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
        default: 0, // Mặc định là 0
    },
    category: {
        type: Schema.Types.ObjectId,// Liên kết với Category
        ref: 'CategoryModel', // Tham chiếu đến model Category
        required: true,
    },
    image: {
        type: String, // Có thể là đường dẫn URL hoặc đường dẫn tương đối đến ảnh
        required: true, // Bắt buộc nhập ảnh
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Tạo model từ schema
const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;
