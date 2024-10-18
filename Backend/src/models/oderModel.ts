import mongoose, { Schema } from 'mongoose';

// Định nghĩa schema cho Order
const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, // Liên kết với User
        ref: 'User', // Tham chiếu đến model User
        required: true,
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId, // Liên kết với Product
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1, // Mặc định là 1
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Tạo model từ schema
const OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel;