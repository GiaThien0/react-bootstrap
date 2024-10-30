import express from 'express';
import  productController  from '../controller/productController';
import upload from '../config/multer';

const router = express.Router();

router.get('/getproducts', productController.getProducts);
router.post('/postproducts', productController.addProduct);
router.get('/getproducts/:id', productController.getProductById);
router.post('/addproductsadmin',upload.single('image'),productController.adddprouctadm)
export default router;