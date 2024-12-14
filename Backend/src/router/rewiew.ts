import express from 'express';
import rewiewController from '../controller/rewiew';

const router = express.Router();
router.post('/reviewdata', rewiewController.reviewdata);  // Đây là chính xác.
router.get('/getrewiew/:productId', rewiewController.getReview);

export default router;
