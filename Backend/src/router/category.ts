import express from 'express';
import  categoryController  from '../controller/category';

const router = express.Router();


router.post('/addCategory',categoryController.addCategory)

export default router;