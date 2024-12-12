import CartModel from '../models/CartModel';
import ProductModel from '../models/productModel';

const Cart = {
    usercart: async (req: any, res: any) => {
        try {
            const userId = req.params.userId; // Lấy userId từ tham số đường dẫn
    
            // Tìm giỏ hàng của user và populate sản phẩm trong giỏ hàng
            const cart = await CartModel.findOne({ user: userId }).populate('products.product');
    
            // Nếu không tìm thấy giỏ hàng, trả về giỏ hàng rỗng
            if (!cart) {
                return res.json({ products: [] });
            }
    
            // Thêm thông tin stock vào mỗi sản phẩm trong giỏ hàng
            const updatedCart = cart.products.map((item: any) => {
                return {
                    product: {
                        ...item.product.toObject(), // Chuyển đối tượng product sang object
                        stock: item.product.stock, // Lấy thông tin stock từ product
                    },
                    quantity: item.quantity,
                };
            });
    
            // Trả về giỏ hàng với thông tin stock
            res.json({ products: updatedCart });
        } catch (error: any) {
            console.error('Error fetching cart:', error);
            res.status(500).json({ message: error.message });
        }
    },
}

export default Cart;
