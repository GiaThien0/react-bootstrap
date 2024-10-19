import express from 'express';
import  productController  from '../controller/productController';

const router = express.Router();

router.get('/getproducts', productController.getProducts);
router.post('/postproducts', productController.addProduct);
router.get('/getproducts/:id', productController.getProductById);

export default router;