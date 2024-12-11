import express from 'express';
import  orderController  from '../controller/orderController';
import usermiddleware from '../middleware/usermiddleware';

const router = express.Router();

router.post('/checkout/:userId',orderController.checkout)
router.get('/getcheckout',orderController.getcheckou)
router.put('/checkoutproducoder/:orderId/:productId',orderController.checkoutproducoder)
router.use(usermiddleware.authenticateToken)

export default router;
