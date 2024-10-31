import express from 'express';
import  productController  from '../controller/productController';
import upload from '../config/multer';

const router = express.Router();

router.get('/getproducts', productController.getProducts);
router.get('/getproducts/:id', productController.getProductById);
router.post('/addproductsadmin',upload.single('image'),productController.adddprouctadm)
router.delete('/deteleproducts/:id', productController.deleteProductAdm);

export default router;