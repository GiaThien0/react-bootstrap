import CategoryModel from '../models/category';

const categoryController = {
    addCategory: async (req:any, res:any) => {
        try {
            const { name } = req.body; // Nhận tên loại sản phẩm từ request body
            if (!name) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const newCategory = new CategoryModel({ name });
            const savedCategory = await newCategory.save();
            res.status(201).json(savedCategory);
        } catch (error) {
            res.status(500).json({ message: "Error adding category", error });
        }
    },

  
};

export default categoryController;