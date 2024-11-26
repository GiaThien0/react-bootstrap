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
            },isApproved: {
                type: Boolean,
                default: false, // Mặc định sản phẩm chưa được duyệt
              },
        },
        
    ],
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'paypal', 'cash_on_delivery'],
        required: true, // Bắt buộc chọn phương thức thanh toán
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending', // Mặc định là chờ thanh toán
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    
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