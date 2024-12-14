import mongoose from 'mongoose';
import CartModel from '../models/CartModel';

const Cart = {
    usercart: async (req: any, res: any) => {
        try {
            const userId: string = req.params.userId;

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }

            const cart = await CartModel.findOne({ user: new mongoose.Types.ObjectId(userId) }).populate('products.product');

            if (!cart) {
                return res.json({ products: [] });
            }

            const updatedCart = cart.products.map((item: any) => {
                return {
                    product: {
                        ...item.product.toObject(),
                        stock: item.product.stock,
                    },
                    quantity: item.quantity,
                };
            });

            res.json({ products: updatedCart });
        } catch (error: any) {
            console.error('Error fetching cart:', error.message);
            res.status(500).json({ message: error.message });
        }
    },

 
    updatecart: async (req: any, res: any) => {
        try {
            const { userId, items } = req.body;

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }

            let cart = await CartModel.findOne({ user: new mongoose.Types.ObjectId(userId) });

            if (cart) {
                cart.products = items;
            } else {
                cart = new CartModel({ user: new mongoose.Types.ObjectId(userId), products: items });
            }

            await cart.save();
            res.status(200).json({ message: 'Cart updated successfully' });
        } catch (error: any) {
            console.error('Error updating cart:', error.message);
            res.status(500).json({ message: error.message });
        }
    },
};


    


export default Cart;
