import CartModel from "../models/CartModel";
import OrderModel from "../models/oderModel";
import ProductModel from "../models/productModel";
import UserModel from "../models/userModel";



const checkout = { 
    checkout: async (req: any, res: any) => {
        const { totalAmount, paymentMethod, phone, address, products } = req.body;
        const { userId } = req.params;
    
        try {
            // Kiểm tra xem người dùng có tồn tại không
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại.' });
            }
    
            // Kiểm tra tính hợp lệ của products
            if (!Array.isArray(products) || products.length === 0) {
                return res.status(400).json({ message: 'Danh sách sản phẩm không hợp lệ.' });
            }
    
            // Kiểm tra từng sản phẩm trong giỏ hàng
            for (const item of products) {
                if (!item.product || !item.quantity) {
                    return res.status(400).json({ message: 'Thông tin sản phẩm không hợp lệ.' });
                }
    
                // const product = await ProductModel.findById(item.product);
                // if (!product || product.stock < item.quantity) {
                //     return res.status(400).json({ message: `Sản phẩm ${item.product} không đủ hàng.` });
                // }
            }
    
            // Tạo đơn hàng mới
            const newOrder = new OrderModel({
                user: userId,
                products,
                totalAmount,
                paymentMethod,
                phone,
                address,
                status: 'pending', // Trạng thái mặc định
            });
    
            // Lưu đơn hàng vào cơ sở dữ liệu
            await newOrder.save();
    
            // Cập nhật số lượng hàng tồn kho của sản phẩm
            // for (const item of products) {
            //     await ProductModel.findByIdAndUpdate(item.product, {
            //         $inc: { stock: -item.quantity },
            //     });
            // }
            await CartModel.findOneAndDelete({ user: userId });

            return res.status(201).json({ message: 'Đơn hàng đã được tạo thành công.', order: newOrder });
        } catch (error: any) {
            console.error("Lỗi xảy ra:", error);
            return res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại.', error: error.message });
        }
    },
    getcheckou : async (req:any,res:any ) => {
        try {
            const orders = await OrderModel.find({})
                .populate({
                    path: 'products.product',
                    select: 'image name',
                })
                .populate({
                    path: 'user',
                    select: 'email',
                })
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi đọc order', error });
        }

    }


};
    export default checkout; 