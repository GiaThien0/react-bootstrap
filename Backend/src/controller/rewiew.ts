import mongoose from 'mongoose';
import ProductModel from '../models/productModel';
import ReviewModel from '../models/rewiew';

const reviewController = {  
    reviewdata: async (req:any, res:any) => {
        const { rating, comment, productId, email, userId, parentReview } = req.body;

        console.log("Received data: ", req.body);

        if (!comment || !productId || !userId || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        try {
            if (parentReview) {
                // Nếu có parentReview, thêm bình luận con vào đánh giá
                const review = await ReviewModel.findById(parentReview);
                if (!review) {
                    return res.status(404).json({ message: 'Parent review not found' });
                }

                review.comments.push({
                    userId,
                    email, // Thêm email vào bình luận con
                    comment,
                });
                await review.save();

                res.status(201).json({ 
                    message: 'Reply submitted successfully',
                    review,
                });
            } else {
                // Nếu không có parentReview, tạo mới một review
                const newReview = new ReviewModel({
                    userId,
                    email,
                    rating: rating || 1, // Đảm bảo rating không phải là 0
                    comment,
                    productId,
                });

                await newReview.save();

                const product = await ProductModel.findById(productId);
                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }

                product.reviews.push(newReview._id);
                await product.save();

                res.status(201).json({ 
                    message: 'Review submitted successfully',
                    review: newReview,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error submitting review' });
        }
    },
    getReview: async (req:any, res:any) => {
        const { productId } = req.params;

        try {
            const reviews = await ReviewModel.find({ productId }).populate('comments.userId');
          
            if (!reviews || reviews.length === 0) {
                return res.status(404).json({ message: 'No reviews found for this product.' });
            }
          
            res.status(200).json(reviews);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
};

export default reviewController;
