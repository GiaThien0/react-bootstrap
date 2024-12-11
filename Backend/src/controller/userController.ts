import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { sendVerificationEmail } from '../config/nodemailer';  // Đảm bảo đường dẫn đúng tới file email.ts
import { sendPasswordResetEmail } from '../config/nodemailer';  // Đảm bảo đường dẫn đúng tới file email.ts

dotenv.config();

const authController = {
      registerUser: async (req: any, res: any) => {
        try {
            console.log("Dữ liệu nhận được:", req.body);
    
            // Kiểm tra dữ liệu đầu vào
            if (!req.body.name || !req.body.email || !req.body.password) {
                return res.status(400).json({ message: "Thiếu thông tin yêu cầu" });
            }
    
            // Kiểm tra người dùng đã tồn tại
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                console.log("Email đã tồn tại:", req.body.email);
                return res.status(400).json({ message: "Email đã tồn tại" });
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
            console.log("Người dùng đã được thêm:", user);
    
            // Tạo token xác thực (JWT hoặc một token khác nếu cần)
            const verificationToken = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET || 'your-secret-key',  // Đảm bảo có biến môi trường cho JWT_SECRET
                { expiresIn: '1h' }  // Token hết hạn sau 1 giờ
            );
    
            // Gửi email xác thực
            await sendVerificationEmail(user.email, verificationToken);
    
            // Trả về thông tin người dùng (trừ mật khẩu)
            res.status(200).json({
                message: "Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản.",
                user: {
                    name: user.name,
                    email: user.email,
                },
            });
        } catch (err: any) {
            console.error("Lỗi trong quá trình đăng ký:", err);
            res.status(500).json({ message: "Lỗi server", error: err.message });
        }
    },

    // Xác thực email người dùng
   
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

    // Kiểm tra trạng thái xác thực email
    if (!user.isVerified) {
        return res.status(400).json({ message: "Please verify your email before logging in" });
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
        { id: user._id, role: user.role, name: user.name, email: user.email, address: user.address,phone : user.phone },
        tokenSecret,
        { expiresIn: "1h" }
    );

    // Thiết lập cookie với token
    res.cookie('token', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',    
            maxAge: 3600000  // 1 giờ
    });

    // Phản hồi thành công, không cần trả token trong body nếu đã sử dụng cookie
    res.status(200).json({
        message: "Login successful",
        user: { id: user._id, name: user.name, role: user.role, address: user.address,phone : user.phone },
        token: token // Thêm token vào body (tùy chọn, không cần thiết nếu dùng cookie)

    });

} catch (err:any) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
}
    },

   
    logoutUser: async (req :any, res:any) => {
        try {
            // Xóa cookie ở server nếu cần
            res.clearCookie('token', {
                path: '/',         // Đường dẫn cookie
                sameSite: 'None',  // Cấu hình SameSite
                secure: true       // Chỉ định cookie chỉ được gửi qua HTTPS
            });
            // Trả về phản hồi thành công
            res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error", error });
        }
    },
    addUser: async (req:any, res :any) => {
        try {
           
            const { name, email, password, role } = req.body;
            if (!name || !email || !password || !role) {
                return res.status(400).json({ message: "Missing required fields" });
            }
            if (name === "user" || name === "admin") {
                return res.status(400).json({ message: "Bạn không được đặt tên là admin hoặc user" });
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
                isVerified : false
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
        const { name, email, password, role,isVerified  } = req.body;
    
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
        if (typeof isVerified === 'boolean') { // Kiểm tra nếu isVerified là kiểu boolean (true/false)
            updateData.isVerified = isVerified; // Cập nhật trạng thái xác minh
        }
    
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

    },
    
    
    Userupdate: async (req: any, res: any) => { // chinh sửa thong tin cho nguoi dung
        try {
            const { id } = req.params;  // Lấy id từ URL params
            const { name, address, phone } = req.body;
    
            // Tìm người dùng trong cơ sở dữ liệu theo id
            const user = await User.findById(id);  // Sử dụng id từ params, không phải từ body
    
            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại' });
            }
    
            // Cập nhật thông tin người dùng
            user.name = name || user.name;
            user.address = address || user.address;
            user.phone = phone || user.phone;
    
            // Lưu thông tin đã được cập nhật vào cơ sở dữ liệu
            await user.save();
    
            // Tạo JWT mới với thông tin người dùng đã cập nhật
            const newAccessToken = jwt.sign(
                { id: user._id, name: user.name, address: user.address, phone: user.phone }, 
                process.env.jwt_ac!, 
                { expiresIn: '1h' }
            );
    
            return res.status(200).json({
                message: 'Thông tin người dùng đã được cập nhật',
                user,  // Trả về thông tin đã được cập nhật
                accessToken: newAccessToken,  // Trả về access token mới
            });
        } catch (error) {
            console.error('Error updating user data:', error);
            return res.status(500).json({ message: 'Đã có lỗi xảy ra' });
        }
    },



        


    verifyemail: async (req: any, res: any) => {
        const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: "Token là bắt buộc" });
    }

    try {
        // Giải mã token
        const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET || 'your-secret-key');
        console.log(decoded); // Kiểm tra payload của token

        const userId = decoded.userId;
        if (!userId) {
            return res.status(400).json({ message: "Token không hợp lệ, không tìm thấy userId" });
        }

        // Cập nhật người dùng thành đã xác thực
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        // Xác thực tài khoản thành công
        user.isVerified = true;  // Giả sử có trường `isVerified` trong model User
        await user.save();

        res.status(200).json({ message: "Xác thực email thành công!" });
    } catch (err:any) {
        console.error("Lỗi khi xác thực email:", err);
        res.status(500).json({ message: "Lỗi xác thực email", error: err.message });
    }

    },
    resetPassword : async (req: any, res: any) => {
        const { token, newPassword } = req.body;

        try {
            // Giải mã token JWT
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            const userId = decoded.userId;
            if (!userId) {
                return res.status(400).json({ message: "Token không hợp lệ" });
            }
    
            // Kiểm tra người dùng
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "Người dùng không tồn tại" });
            }
    
            // Mã hóa mật khẩu mới
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
    
            // Cập nhật mật khẩu mới
            user.password = hashedPassword;
            await user.save();
    
            res.status(200).json({ message: "Mật khẩu đã được cập nhật thành công!" });
        } catch (error: any) {
            console.error('Lỗi khi đặt lại mật khẩu:', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }

    },
        forgotPassword: async (req: any, res: any) => {
            const { email } = req.body;
        
            try {
                // Kiểm tra người dùng có tồn tại không
                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(404).json({ message: "Email không tồn tại" });
                }
        
                // Tạo token khôi phục mật khẩu (JWT)
                const resetToken = jwt.sign(
                    { userId: user._id },
                    process.env.JWT_SECRET || 'your-secret-key', // Mã hóa với bí mật
                    { expiresIn: '1h' } // Token hết hạn sau 1 giờ
                );
        
                // Gửi email khôi phục mật khẩu
                await sendPasswordResetEmail(user.email, resetToken);
        
                return res.status(200).json({ 
                    message: 'Email xác thực thành công!',
                    resetPasswordUrl: `http://localhost:3000/reset-password?token=${resetToken}` // Link với token
                });
        
            } catch (error: any) {
                console.error('Lỗi khi gửi email khôi phục mật khẩu:', error);
                res.status(500).json({ message: 'Lỗi server', error: error.message });
            }
    }
    


};


export default authController;
