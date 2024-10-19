import mongoose, { Schema } from 'mongoose';

// Định nghĩa schema cho Category
const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
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
const CategoryModel = mongoose.model('Category', CategorySchema);
export default CategoryModel;