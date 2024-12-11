import express from 'express';
import productController from '../controller/productController';
import upload from '../config/multer';
import search from '../middleware/search';
import usermiddleware from '../middleware/usermiddleware';

const router = express.Router();

router.get('/getproducts', productController.getProducts);
router.get('/getproducts/:id', productController.getProductById);
router.post('/addproductsadmin', usermiddleware.authenticateToken, upload.single('image'), productController.adddprouctadm);
router.delete('/deteleproducts/:id', usermiddleware.authenticateToken, productController.deleteProductAdm);
router.put('/updateProduct/:id', usermiddleware.authenticateToken, upload.single('image'), productController.updateProduct);
router.get('/search', search.search);

export default router;
