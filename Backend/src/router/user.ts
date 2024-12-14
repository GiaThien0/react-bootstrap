import express from 'express';
import usermiddleware from '../middleware/usermiddleware';
import authController from '../controller/userController';

const router = express.Router();

// Các route không yêu cầu xác thực
router.post("/register", authController.registerUser);
router.post("/loginUser", authController.loginUser);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.get('/verify-email', authController.verifyemail);

// Đặt middleware xác thực cho tất cả các route cần xác thực

// Các route yêu cầu xác thực
router.post("/logoutUser", authController.logoutUser);
router.post("/addUser", authController.addUser);
router.get("/readusers", authController.readusers);
router.delete("/deleteuser/:id", authController.deleteuser);
router.put("/updateuser/:id", authController.updateUser);
router.get('/userdata', usermiddleware.authenticateToken,usermiddleware.getdatalogin);
router.put('/Userupdate/:id',usermiddleware.authenticateToken, authController.Userupdate);
export default router;
