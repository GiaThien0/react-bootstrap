import express from 'express';
import authController from '../controller/userController';
import usermiddleware from '../middleware/usermiddleware';

const router = express.Router();

// Định nghĩa route cho đăng ký
router.post("/register", authController.registerUser);
router.post("/loginUser" , authController.loginUser,usermiddleware.authenticateToken);
router.get("/getuser",authController.getuser)
export default router;