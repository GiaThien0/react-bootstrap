import express from 'express';
import DiscountController from '../controller/Discountcontroler';
import upload from '../config/multer';

const router = express.Router();

// Tạo mới giảm giá với xử lý upload ảnh
router.post('/createDiscount', upload.single('image'), DiscountController.createDiscount);

// Lấy tất cả giảm giá
router.get('/getAllDiscounts', DiscountController.getAllDiscounts);

// Lấy chi tiết một giảm giá
router.get('/getDiscountById/:id', DiscountController.getDiscountById);

// Cập nhật giảm giá với xử lý upload ảnh
router.put('/updateDiscount/:id', upload.single('image'), DiscountController.updateDiscount);

// Xóa giảm giá
router.delete('/deleteDiscount/:id', DiscountController.deleteDiscount);

// Gán giảm giá cho sản phẩm
router.put('/product/:id/discount', DiscountController.assignDiscountToProduct);

export default router;
