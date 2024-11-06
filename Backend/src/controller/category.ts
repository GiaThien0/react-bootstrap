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

}


}





export default categoryController;
