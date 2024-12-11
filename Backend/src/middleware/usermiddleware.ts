import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';
import dotenv from 'dotenv';
dotenv.config();

const usermiddleware = {
    authenticateToken: (req: any, res: any, next: any) => {  
        const token = req.cookies.token; 
        if (!token) return res.sendStatus(401);

        jwt.verify(token, process.env.jwt_ac!, (err: any, user: any) => {
            if (err) return res.sendStatus(403); // Nếu token không hợp lệ, trả về 403
            req.user = user; // Lưu thông tin người dùng vào req
            next(); // Tiếp tục đến middleware hoặc route tiếp theo
        });
    },

    getdatalogin: async (req: any, res: any) => {  
        if (req.user) {
            try {
                // Lấy lại thông tin người dùng từ cơ sở dữ liệu
                const user = await UserModel.findById(req.user.id);  // Tìm lại người dùng trong DB
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                res.status(200).json({ 
                    message: "User data retrieved successfully", 
                    user: {
                        id: user._id,
                        name: user.name,
                        role: user.role,
                        email: user.email,
                        address: user.address,
                        phone: user.phone
                    }
                });
            } catch (err: any) {
                res.status(500).json({ message: "Internal Server Error", error: err.message });
            }
        } else {
            res.status(401).json({ message: "No user data found" });
        }
    },

    refreshToken: (req: any, res: any) => {
        const refreshToken = req.cookies.refreshToken || req.headers['x-refresh-token'];
        if (!refreshToken) return res.sendStatus(401); // Không có refresh token

        jwt.verify(refreshToken, process.env.jwt_refresh!, (err: any, user: any) => {
            if (err) return res.sendStatus(403); // Refresh token không hợp lệ

            // Tạo mới access token
            const newAccessToken = jwt.sign({ id: user.id }, process.env.jwt_ac!, { expiresIn: '1h' });

            res.json({ accessToken: newAccessToken });
        });
    },
}

export default usermiddleware; // Xuất mặc định
