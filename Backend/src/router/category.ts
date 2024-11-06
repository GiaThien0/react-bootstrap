import express from 'express';
import  categoryController  from '../controller/category';

const router = express.Router();

router.get('/category/:id', categoryController.getProductsByCategory);

router.get('/getcategory',categoryController.getcategory)
router.post('/addcategory',categoryController.addcategory)
router.delete('/deletecategory/:id',categoryController.deletecategory)

export default router;
