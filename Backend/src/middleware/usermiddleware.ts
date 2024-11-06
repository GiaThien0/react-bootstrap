
import jwt from 'jsonwebtoken';

const usermiddleware ={
  authenticateToken: (req: any, res: any, next: any) => {  
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Lấy token từ cookie hoặc header
    if (!token) return res.sendStatus(401); // Không có token, trả về 401
  
    jwt.verify(token, process.env.jwt_ac!, (err :any, user:any) => {
      if (err) return res.sendStatus(403); // Nếu token không hợp lệ, trả về 403
      req.user = user; // Lưu thông tin người dùng vào req
      next(); // Tiếp tục đến middleware hoặc route tiếp theo
    });
}  ,
  getdatalogin: (req: any, res: any) => {  
    if (req.user) {
      res.status(200).json({ 
        message: "User data retrieved successfully", 
        user: req.user 
      });
    } else {
      res.status(401).json({ message: "No user data found" });
    }
  }


}







export default usermiddleware; // Xuất mặc định