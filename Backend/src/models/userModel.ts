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
    address: {  // Thêm trường địa chỉ
        type: String,
        required: false,  // Bạn có thể để là không bắt buộc nếu người dùng không có địa chỉ
        default: '' // Mặc định là 'user'

    },
    phone: {
        type: String,
        required: false,
        default: '' // Mặc định là 'user'

    },
    isVerified: {
        type: Boolean,
        default: false,  // Mặc định là chưa xác thực
    },
    verificationToken: {
        type: String,
        required: false,  // Trường này chỉ có khi người dùng cần xác thực
    },
    resetPasswordToken: {
        type: String,
        required: false,  // Dùng khi người dùng yêu cầu reset mật khẩu
    },
    resetPasswordExpires: {
        type: Date,
        required: false,  // Thời gian hết hạn của token reset mật khẩu
    },
}, {
    timestamps: true  // Tự động thêm `createdAt` và `updatedAt`
});

// Tạo model từ schema
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;