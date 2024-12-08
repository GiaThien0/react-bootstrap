import express from 'express';
import authController from '../controller/userController';
import usermiddleware from '../middleware/usermiddleware';

const router = express.Router();

// Định nghĩa route cho đăng ký
router.post("/register", authController.registerUser);

router.post("/loginUser" , authController.loginUser);

router.post("/logoutUser",authController.logoutUser)
router.post("/addUser",authController.addUser)
router.get("/readusers" , authController.readusers)
router.delete("/deleteuser/:id",authController.deleteuser)
router.put("/updateuser/:id",authController.updateUser)
router.get('/adm/userdata', usermiddleware.authenticateToken, usermiddleware.getdatalogin);
router.put('/Userupdate/:id', authController.Userupdate);

// Route yêu cầu khôi phục mật khẩu
router.post('/forgot-password', authController.forgotPassword);

// Route để đặt lại mật khẩu
router.post('/reset-password', authController.resetPassword);
router.get('/verify-email', authController.verifyemail);

export default router;
