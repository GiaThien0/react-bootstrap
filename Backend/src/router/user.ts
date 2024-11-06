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


export default router;
