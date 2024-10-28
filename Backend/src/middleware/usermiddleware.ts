
import jwt from 'jsonwebtoken';
const usermiddleware ={
  authenticateToken: (req: any, res: any, next: any) => {  
    const token = req.cookies.token; // Lấy token từ cookie 'cookie'  
    if (!token) return res.status(401).json({ message: "Access Denied" });  

    jwt.verify(token, process.env.jwt_ac!, (err: any, user: any) => {  
        if (err) return res.status(403).json({ message: "Invalid Token" });  
        req.user = user;  
        next();  
    });  
}  
};  



export default usermiddleware; // Xuất mặc định