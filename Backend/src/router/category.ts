import express from 'express';
import  categoryController  from '../controller/category';
import usermiddleware from '../middleware/usermiddleware';

const router = express.Router();

router.get('/category/:id', categoryController.getProductsByCategory);

router.get('/getcategory',categoryController.getcategory)
router.post('/addcategory',categoryController.addcategory)
router.delete('/deletecategory/:id',categoryController.deletecategory)
router.get('/listproduct',categoryController.listproduct)
router.use(usermiddleware.authenticateToken)

export default router;
