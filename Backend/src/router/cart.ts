import express from 'express';
import  cartControler  from '../controller/cartControler';
import usermiddleware from '../middleware/usermiddleware';

const router = express.Router();
router.get('/usercart/:userId',cartControler.usercart,)

export default router;
