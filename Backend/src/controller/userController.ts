import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();
const authController = {
    registerUser: async (req: any, res: any) => {
        try {
            // Kiểm tra dữ liệu đầu vào
            if (!req.body.name || !req.body.email ||  !req.body.password ) {
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

    loginUser: async (req: any, res: any) => {
        try {
            // Kiểm tra dữ liệu đầu vào
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

        // Kiểm tra nếu tokenSecret không được định nghĩa
        if (!tokenSecret) {
            return res.status(500).json({ message: "JWT secret key is not defined" });
        }

        // Tạo token
        const token = jwt.sign(  
            {  
                id: user._id,  
                admin: user.admin,  
                name: user.name  
            },  
            tokenSecret!, // thêm ! để chắc chắn tokenSecret đã được gán giá trị  
            { expiresIn: "1h" }  
        );  

        // Thiết lập cookie với token  
        res.cookie('cookie', token, {  
            httpOnly: true,  
            secure: process.env.NODE_ENV === 'production',  
            maxAge: 3600000  
        });  

        res.status(200).json({  
            message: "Login successful",  
            user: { id: user._id, name: user.name, email: user.email }, 
         
            // Loại bỏ việc gửi token trong body response:  
            // token: token,  
        });  

                
          

        } catch (err) {
            console.error(err);  // Ghi log lỗi
            res.status(500).json({ message: "Internal Server Error", error: err });
        }
    },


};

export default authController; // Xuất mặc định