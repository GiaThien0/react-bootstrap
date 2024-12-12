import express from 'express';
import orderController from '../controller/orderController';
import usermiddleware from '../middleware/usermiddleware';

const router = express.Router();

// Endpoint để thanh toán đơn hàng
router.post('/checkout/:userId', orderController.checkout);

// Endpoint để lấy danh sách đơn hàng
router.get('/list', orderController.getCheckout);

// Endpoint để lấy đơn hàng theo ID
router.get('/:id', orderController.getOrderById);

// Endpoint để cập nhật trạng thái đơn hàng
router.put('/update-status/:id', orderController.updateOrderStatus);

// Endpoint để lấy danh sách đơn hàng theo trạng thái
router.get('/status/:status', orderController.getOrdersByStatus);
// Endpoint để hủy đơn hàng
router.delete('/cancel/:id', orderController.cancelOrder);

export default router;
