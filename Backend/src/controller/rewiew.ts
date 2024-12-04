import ProductModel from '../models/productModel';
import ReviewModel from '../models/rewiew';


const rewiewController = {  
    reviewdata : async (req: any, res: any) => {
        const { rating, comment, productId, email, userId } = req.body;

        // Kiểm tra tất cả các trường bắt buộc
        if (!rating || !comment || !productId || !userId || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        try {
            // Tạo mới một review
            const newReview = new ReviewModel({
                userId,      // ID người dùng
                email,       // Email người dùng
                rating,      // Điểm đánh giá (sao)
                comment,     // Nội dung bình luận
                productId,   // ID sản phẩm mà bình luận thuộc về
            });
    
            // Lưu review vào collection Review
            await newReview.save();
    
            // Cập nhật lại thông tin của sản phẩm
            const product = await ProductModel.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
    
            // Thêm review vào danh sách reviews của sản phẩm
            product.reviews.push(newReview._id); // Thêm ID của review vào mảng reviews của sản phẩm
            await product.save(); // Lưu lại sản phẩm đã được cập nhật
    
            // Trả về kết quả thành công
            res.status(201).json({ 
                message: 'Review submitted successfully',
                review: newReview,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error submitting review' });
        }
},
        getrewiew: async (req: any, res: any) => {
            const { productId } = req.params; // Lấy productId từ tham số URL

            try {
              // Tìm tất cả các bình luận có cùng productId
              const reviews = await ReviewModel.find({ productId: productId });
          
              if (!reviews || reviews.length === 0) {
                return res.status(404).json({ message: 'No reviews found for this product.' });
              }
          
              // Trả về danh sách bình luận
              res.status(200).json(reviews);
            } catch (error) {
              console.error(error);
              res.status(500).json({ message: 'Server error' });
            }
},

}
    export default rewiewController; 