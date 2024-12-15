import mongoose, { Schema } from 'mongoose';

const DiscountSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    percentage: {
        type: Number,
        required: true,
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product', // Tham chiếu đến model Product
        },
    ],
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    image: {
        type: String, // URL hoặc đường dẫn file
        required: false, // Không bắt buộc (tuỳ bạn)
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const DiscountModel = mongoose.model('Discount', DiscountSchema);
export default DiscountModel;
