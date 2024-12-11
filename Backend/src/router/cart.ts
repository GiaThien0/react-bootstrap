import express from 'express';
import  cartControler  from '../controller/cartControler';
import usermiddleware from '../middleware/usermiddleware';

const router = express.Router();
router.get('/usercart/:userId',cartControler.usercart,)
router.post('/addcart',cartControler.addcart)
router.delete('/removecart/:userId/:productId', cartControler.removecart);
router.delete('/deletecart/:userId', cartControler.deletecart); // Sửa "detelecart" thành "deletecart"
router.put('/increase/:userId/:productId', cartControler.increase); // Tăng số lượng sản phẩm
router.put('/decrease/:userId/:productId', cartControler.decrease); // Giảm số lượng sản phẩm

export default router;
