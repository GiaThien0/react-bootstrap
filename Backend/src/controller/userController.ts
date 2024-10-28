import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authController = {
    registerUser: async (req :any, res :any) => {
        try {
            // Kiểm tra dữ liệu đầu vào
            if (!req.body.name || !req.body.email || !req.body.password || !req.body.role) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            // Kiểm tra người dùng đã tồn tại
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already exists" });
            }

            // Mã hóa mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // Tạo người dùng mới
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashed,
            });

            // Lưu vào cơ sở dữ liệu
            const user = await newUser.save();
            res.status(200).json(user);

        } catch (err) {
            console.error(err);  // Ghi log lỗi
            res.status(500).json({ message: "Internal Server Error", error: err });
        }
    },

    loginUser: async (req :any, res :any) => {
        try {
            if (!req.body.email || !req.body.password) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            // Tìm người dùng theo email
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ message: "Invalid email or password" });
            }

            // So sánh mật khẩu
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid email or password" });
            }

            const tokenSecret = process.env.jwt_ac;
            if (!tokenSecret) {
                return res.status(500).json({ message: "JWT secret key is not defined" });
            }

            // Tạo token
            const token = jwt.sign(
                { id: user._id, role: user.role, name: user.name },
                tokenSecret,
                { expiresIn: "1h" }
            );

            // Thiết lập cookie với token
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000
            });

            res.status(200).json({
                message: "Login successful",
                user: { id: user._id, name: user.name,role: user.role  },
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error", error: err });
        }
    },

   
    logoutUser: async (req :any, res:any) => {
        try {
            // Xóa cookie ở server nếu cần
            res.clearCookie('token'); // Đảm bảo cookie token được xóa
            
            // Trả về phản hồi thành công
            res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error", error });
        }
    },
    addUser: async (req:any, res :any) => {
        try {
            // Xác thực xem người dùng hiện tại có vai trò là admin không
            // if (req.user.role !== 'admin') {
            //     return res.status(403).json({ message: "Forbidden: You don't have permission to add users" });
            // }

            // Kiểm tra dữ liệu đầu vào
            const { name, email, password, role } = req.body;
            if (!name || !email || !password || !role) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            // Kiểm tra xem email đã tồn tại chưa
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already exists" });
            }

            // Mã hóa mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Tạo người dùng mới với vai trò được cung cấp
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                role: role === 'admin' ? 'admin' : 'user', // Chỉ chấp nhận 'admin' hoặc 'user'
            });

            // Lưu người dùng vào cơ sở dữ liệu
            const user = await newUser.save();
            res.status(201).json({ message: "User added successfully", user });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error", error: err });
        }
    },
    readusers : async (req:any, res :any) => {
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi đọc người dùng', error });
        }

    },
    deleteuser : async (req:any, res :any) => {
        const { id } = req.params;

        try {
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'Người dùng không tìm thấy' });
            }
            res.status(200).json({ message: 'Người dùng đã được xóa', user: deletedUser });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi xóa người dùng', error });
        }
    },
    updateUser: async (req: any, res: any) => {
        const { id } = req.params;
        const { name, email, password, role } = req.body;
    
        const updateData: any = {}; // Tạo một đối tượng rỗng để chứa dữ liệu cập nhật
    
        // Chỉ thêm các trường cần thiết vào đối tượng cập nhật
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) {
            // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
            const hashedPassword = await bcrypt.hash(password, 10); // Sử dụng bcrypt để mã hóa mật khẩu
            updateData.password = hashedPassword;
        }
        if (role) updateData.role = role;
    
        try {
            const updatedUser = await User.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            );
            
            if (!updatedUser) {
                return res.status(404).json({ message: 'Người dùng không tìm thấy' });
            }
            res.status(200).json({ message: 'Người dùng đã được cập nhật', user: updatedUser });
        } catch (error) {
            res.status(400).json({ message: 'Lỗi khi cập nhật người dùng', error });
        }
    }



};


export default authController;
