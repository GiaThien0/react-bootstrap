import CategoryModel from '../models/category';
import ProductModel from '../models/productModel';

const categoryController = {   

    getcategory: async (req: any, res: any) => {
        try {
            const categories = await CategoryModel.find();
            res.status(200).json(categories);
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }

},
getProductsByCategory : async (req:any, res :any) => {
    const categoryId = req.params.id;
    try {
        // Tìm các sản phẩm theo categoryId
        const filteredProducts = await ProductModel.find({ category: categoryId });
        res.status(200).json(filteredProducts); // Trả về danh sách sản phẩm theo danh mục
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}  
}

export default categoryController;
