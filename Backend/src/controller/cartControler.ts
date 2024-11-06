import CartModel from '../models/CartModel';
import ProductModel from '../models/productModel';

const Cart = {
    usercart: async (req: any, res: any) => {
        try {
            const userId = req.params.userId; // Lấy userId từ tham số đường dẫn
    
            const cart = await CartModel.findOne({ user: userId }).populate('products.product');
            
            // Nếu không tìm thấy giỏ hàng, trả về giỏ hàng rỗng
            if (!cart) {
                return res.json({ products: [] }); // Trả về giỏ hàng rỗng thay vì lỗi 404
            }
    
            // Nếu tìm thấy giỏ hàng, trả về giỏ hàng
            res.json(cart);
        } catch (error: any) {
            console.error('Error fetching cart:', error); // Ghi log lỗi
            res.status(500).json({ message: error.message });
        }
    },
    

    addcart: async (req: any, res: any) => {
        const { userId, productId, quantity } = req.body; // Lấy thông tin từ body của yêu cầu
        try {
            // Kiểm tra xem sản phẩm có tồn tại không
            const product = await ProductModel.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
    
            // Tìm giỏ hàng của người dùng
            let cart = await CartModel.findOne({ user: userId });
    
            // Nếu không có giỏ hàng, tạo một cái mới
            if (!cart) {
                cart = new CartModel({ user: userId, products: [] });
            }
    
            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
            if (productIndex > -1) {
                // Nếu sản phẩm đã có, cập nhật số lượng
                cart.products[productIndex].quantity += quantity;
            } else {
                // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
                cart.products.push({ product: productId, quantity }); // Sửa ở đây
            }
    
            // Lưu giỏ hàng
            await cart.save();
    
            res.status(200).json({ message: 'Product added to cart successfully', cart });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },
    

    removecart: async (req :any, res :any) => {
        const { userId, productId } = req.params; // Lấy userId và productId từ URL params
    
        try {
            // Tìm giỏ hàng của người dùng
            const cart = await CartModel.findOne({ user: userId });
    
            if (cart) {
                // Tìm sản phẩm trong giỏ hàng
                const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
    
                if (productIndex > -1) {
                    // Giảm số lượng sản phẩm đi 1
                    cart.products[productIndex].quantity -= 1;
    
                    // Nếu số lượng sản phẩm còn lại là 0, xóa sản phẩm khỏi giỏ hàng
                    if (cart.products[productIndex].quantity <= 0) {
                        cart.products.splice(productIndex, 1);
                    }
    
                    // Lưu giỏ hàng sau khi cập nhật
                    await cart.save();
    
                    // Trả về giỏ hàng đã cập nhật
                    return res.json(cart);
                } else {
                    return res.status(404).json({ message: 'Product not found in cart' });
                }
            } else {
                return res.status(404).json({ message: 'Cart not found' });
            }
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    },



    deletecart: async (req: any, res: any) => {
        const userId = req.params.userId; // Lấy userId từ tham số đường dẫn
        
        try {
            const result = await CartModel.deleteOne({ user: userId });
            if (result.deletedCount > 0) {
                res.json({ message: 'Cart cleared' });
            } else {
                res.status(404).json({ message: 'Cart not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },



    increase: async (req: any, res: any) => {
        const { userId, productId } = req.params; // Lấy userId và productId từ URL params
        try {
            
            const cart = await CartModel.findOne({ user: userId });

            if (cart) {
                const productIndex = cart.products.findIndex(item => item.product.toString() === productId);

                if (productIndex > -1) {
                    cart.products[productIndex].quantity += 1; // Tăng số lượng
                    await cart.save(); // Lưu thay đổi
                    res.status(200).json(cart);
                } else {
                    res.status(404).json({ message: 'Product not found in cart' });
                }
            } else {
                res.status(404).json({ message: 'Cart not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    decrease: async (req: any, res: any) => {
        const { userId, productId } = req.params; // Lấy userId và productId từ URL params
        try {
            const cart = await CartModel.findOne({ user: userId });

            if (cart) {
                const productIndex = cart.products.findIndex(item => item.product.toString() === productId);

                if (productIndex > -1) {
                    if (cart.products[productIndex].quantity > 1) {
                        cart.products[productIndex].quantity -= 1; // Giảm số lượng
                        await cart.save(); // Lưu thay đổi
                        res.status(200).json(cart);
                    } else {
                        // Nếu số lượng sản phẩm còn lại là 1, xóa sản phẩm khỏi giỏ hàng
                        cart.products.splice(productIndex, 1);
                        await cart.save();
                        res.status(200).json(cart);
                    }
                } else {
                    res.status(404).json({ message: 'Product not found in cart' });
                }
            } else {
                res.status(404).json({ message: 'Cart not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },
     
}

export default Cart;
