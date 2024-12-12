import express from 'express';
import BannerController from '../controller/Banner';
import upload from '../config/multer'; // Import middleware upload

const router = express.Router();

// Route để thêm banner mới
router.post('/add', upload.single('image'), BannerController.addBanner);

// Route để lấy danh sách banner
router.get('/list', BannerController.getBanners);

// Route để cập nhật banner
router.put('/update/:id', upload.single('image'), BannerController.updateBanner);

// Route để xóa banner
router.delete('/delete/:id', BannerController.deleteBanner);

export default router;
