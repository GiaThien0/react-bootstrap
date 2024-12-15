import mongoose from 'mongoose';
import Discount from '../models/Discount';
import Product from '../models/productModel'; 
import fs from 'fs/promises';  // Use fs.promises for asynchronous file handling

const DiscountController = {
    // Tạo mới giảm giá
    createDiscount: async (req:any, res:any) => {
        const { title, percentage, products, startDate, endDate, createdBy } = req.body;
        const image = req.file ? req.file.path : null; 

        try {
            const discount = new Discount({
                title,
                percentage,
                products,
                startDate,
                endDate,
                image,
                createdBy,
            });

            await discount.save();

            // Cập nhật trường discount trong các sản phẩm liên quan
            await Product.updateMany(
                { _id: { $in: products } },
                { $set: { discount: discount._id } }
            );

            res.status(201).json(discount);
        } catch (error:any) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },

    // Lấy tất cả giảm giá
    getAllDiscounts: async (req:any, res:any) => {
        try {
            const discounts = await Discount.find()
                .populate({
                    path: 'products',
                    select: 'name image',
                })
                .populate({
                    path: 'createdBy',
                    select: 'name',

                });
                
            res.status(200).json(discounts);
        } catch (error:any) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },

    // Lấy chi tiết một giảm giá
    getDiscountById: async (req:any, res:any) => {
        try {
            const discount = await Discount.findById(req.params.id)
                .populate({
                    path: 'products',
                    select: 'name image',
                })
                .populate('createdBy');
    
            if (!discount) {
                return res.status(404).json({ error: 'Discount not found' });
            }
            res.status(200).json(discount);
        } catch (error:any) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },

    // Cập nhật giảm giá
    updateDiscount: async (req:any, res:any) => {
        const { title, percentage, products, startDate, endDate } = req.body;
        const image = req.file ? req.file.path : null;

        try {
            const discount = await Discount.findByIdAndUpdate(
                req.params.id,
                {
                    title,
                    percentage,
                    products,
                    startDate,
                    endDate,
                    image,
                },
                { new: true }
            );

            if (!discount) {
                return res.status(404).json({ error: 'Discount not found' });
            }

            // Cập nhật trường discount trong các sản phẩm liên quan
            await Product.updateMany(
                { _id: { $in: products } },
                { $set: { discount: discount._id } }
            );

            res.status(200).json(discount);
        } catch (error:any) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },

    // Xóa giảm giá
    deleteDiscount: async (req:any, res:any) => {
        try {
            const discount = await Discount.findByIdAndDelete(req.params.id);

            if (!discount) {
                return res.status(404).json({ error: 'Discount not found' });
            }

            // Gỡ bỏ trường discount trong các sản phẩm liên quan
            await Product.updateMany(
                { discount: discount._id },
                { $unset: { discount: '' } }
            );

            // Xóa file ảnh nếu có
            if (discount.image) {
                await fs.unlink(discount.image);  // Asynchronous image deletion
            }

            res.status(200).json({ message: 'Discount deleted successfully' });
        } catch (error:any) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },

    // Gán giảm giá cho sản phẩm
    assignDiscountToProduct: async (req:any, res:any) => {
        const { discountId } = req.body;

        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            // Only assign the discount if it isn't already assigned
            if (product.discount && product.discount.toString() === discountId) {
                return res.status(400).json({ error: 'This product already has this discount' });
            }

            product.discount = discountId;
            await product.save();

            res.status(200).json(product);
        } catch (error:any) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
};

export default DiscountController;
