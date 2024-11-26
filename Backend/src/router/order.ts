import express from 'express';
import  orderController  from '../controller/orderController';

const router = express.Router();

router.post('/checkout/:userId',orderController.checkout)
router.get('/getcheckout',orderController.getcheckou)
router.put('/checkoutproducoder/:orderId/:productId',orderController.checkoutproducoder)

export default router;
