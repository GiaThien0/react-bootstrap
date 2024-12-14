import express from 'express';
import cartController from '../controller/cartControler';
import usermiddleware from '../middleware/usermiddleware';

const router = express.Router();

router.get('/usercart/:userId', cartController.usercart);
router.post('/updatecart', cartController.updatecart, usermiddleware.authenticateToken);

export default router;
