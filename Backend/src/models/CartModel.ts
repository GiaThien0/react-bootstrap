import mongoose, { Schema } from 'mongoose';

// Định nghĩa schema cho Cart
const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, // Liên kết với User
        ref: 'User',
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
                default: 1,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Tạo model từ schema
const CartModel = mongoose.model('Cart', CartSchema);
export default CartModel;