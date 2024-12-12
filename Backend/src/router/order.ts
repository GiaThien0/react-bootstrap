import express from 'express';
import orderController from '../controller/orderController';
import usermiddleware from '../middleware/usermiddleware';

const router = express.Router();

router.post('/checkout/:userId', orderController.checkout);
router.get('/getcheckout', orderController.getCheckout); // sửa getcheckou thành getCheckout
router.put('/checkoutproductorder/:orderId/:productId', orderController.checkoutProductOrder); // sửa checkoutproducoder thành checkoutProductOrder

export default router;
