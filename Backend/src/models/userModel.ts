import mongoose, { Schema } from 'mongoose';

// Định nghĩa schema cho User
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,  // Trường này là bắt buộc
        minlength: 6,
        maxlength: 20,
        // Không cần unique ở đây
    },
    email: {
        type: String,
        required: true,  // Trường này là bắt buộc
        minlength: 10,
        maxlength: 50,
        unique: true, // Giữ unique cho email
    },
    password: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        // unique: true,  // Bỏ unique cho password
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Các vai trò có thể có
        default: 'user' // Mặc định là 'user'
    },
    admin: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true  // Tự động thêm `createdAt` và `updatedAt`
});

// Tạo model từ schema
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;