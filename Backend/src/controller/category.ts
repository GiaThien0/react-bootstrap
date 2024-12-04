import CategoryModel from '../models/category';
import ProductModel from '../models/productModel';
const { ObjectId } = require('mongoose').Types;

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
}  ,
addcategory : async (req:any, res :any) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Tên loại sản phẩm là bắt buộc.' });
    }

    try {
        const newCategory = new CategoryModel({ name });
        const savedCategory = await newCategory.save();
        
        return res.status(201).json({ message: 'Thêm loại sản phẩm thành công!', data: savedCategory });
    } catch (error:any) {
        console.error('Lỗi khi thêm loại sản phẩm:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Loại sản phẩm đã tồn tại.' });
        }
        return res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại.' });
    }



},
deletecategory : async (req:any, res :any) => {
    const { id } = req.params;

    try {
        const deletedCategory = await CategoryModel.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Không tìm thấy loại sản phẩm để xóa.' });
        }

        return res.status(200).json({ message: 'Xóa loại sản phẩm thành công!', data: deletedCategory });
    } catch (error) {
        console.error('Lỗi khi xóa loại sản phẩm:', error);
        return res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại.' });
    }

},
listproduct : async (req:any, res :any) => {
    const { category } = req.query;  // Lấy category từ query

    try {
        let products;

        // Nếu có category thì lọc theo category, nếu không có category thì trả về tất cả sản phẩm
        if (category && category !== 'null') {
            products = await ProductModel.find({ category: category });  // Lọc theo category


        } else {
            products = await ProductModel.find();  // Trả về tất cả sản phẩm nếu category là null hoặc không có
        }
        res.json(products);  // Trả về sản phẩm dưới dạng JSON
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: 'Error fetching products' });  // Trả lỗi nếu có lỗi
    }

}
}


export default categoryController;
