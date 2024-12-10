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
    

    addcart: async (req: any, res: any) => {
        const { userId, productId, quantity } = req.body; // Lấy thông tin từ body của yêu cầu
        try {
            // Kiểm tra xem sản phẩm có tồn tại không
            const product = await ProductModel.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            // Kiểm tra xem số lượng yêu cầu có vượt quá tồn kho không
            if (quantity > product.stock) {
                return res.status(400).json({ message: `Not enough stock. Available stock: ${product.stock}` });
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
                const updatedQuantity = cart.products[productIndex].quantity + quantity;

                // Kiểm tra lại xem số lượng không vượt quá tồn kho
                if (updatedQuantity > product.stock) {
                    return res.status(400).json({ message: `Not enough stock. Available stock: ${product.stock}` });
                }

                cart.products[productIndex].quantity = updatedQuantity;
            } else {
                // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
                if (quantity > product.stock) {
                    return res.status(400).json({ message: `Not enough stock. Available stock: ${product.stock}` });
                }
                cart.products.push({ product: productId, quantity });
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
        const { userId, productId } = req.params;
        try {
            // Tìm giỏ hàng của người dùng và populate sản phẩm (lấy thông tin đầy đủ về sản phẩm)
            const cart = await CartModel.findOne({ user: userId }).populate({
                path: 'products.product',
                select: 'stock ' // Chỉ lấy các trường cần thiết, bao gồm 'stock'
            });

            if (cart) {
                const productIndex = cart.products.findIndex(item => item.product._id.toString() === productId);

                if (productIndex > -1) {
                    const product = cart.products[productIndex].product as any; // Đảm bảo kiểu dữ liệu là 'any' hoặc chính xác kiểu Product
                    const stock = product.stock; // Lấy số lượng tồn kho từ sản phẩm

                    if (cart.products[productIndex].quantity < stock) {
                        cart.products[productIndex].quantity += 1; // Tăng số lượng sản phẩm
                        await cart.save(); // Lưu thay đổi
                        res.status(200).json(cart);
                    } else {
                        res.status(400).json({ message: 'Sản phẩm không đủ số lượng trong kho' });
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

    decrease: async (req: any, res: any) => {
        const { userId, productId } = req.params;
        try {
            // Tìm giỏ hàng của người dùng và populate sản phẩm
            const cart = await CartModel.findOne({ user: userId }).populate({
                path: 'products.product',
                select: 'stock name price' // Chỉ lấy các trường cần thiết, bao gồm 'stock'
            });

            if (cart) {
                const productIndex = cart.products.findIndex(item => item.product._id.toString() === productId);

                if (productIndex > -1) {
                    if (cart.products[productIndex].quantity > 1) {
                        cart.products[productIndex].quantity -= 1; // Giảm số lượng sản phẩm
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
