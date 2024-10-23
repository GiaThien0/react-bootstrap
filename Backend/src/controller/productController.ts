import ProductModel from '../models/productModel';
import CategoryModel from '../models/category';


const productController = {
    getProductById: async (req:any, res:any) => {
        try {
            const { id } = req.params; // Lấy ID từ tham số URL
            const product = await ProductModel.findById(id); // Tìm sản phẩm theo ID
            
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: "Error fetching product", error });
        }
        
    },
getProducts : async (req:any, res:any) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
},
addProduct: async (req: any, res: any) => {
    try {
        const { name, description, price, image, categoryName } = req.body;

        // Kiểm tra xem tất cả các trường bắt buộc có được cung cấp không
        if (!name || !description || !price || !image || !categoryName) {
            return res.status(400).json({ message: "Missing required fields" });
        }



        // Tìm kiếm category bằng tên
        const category = await CategoryModel.findOne({ name: categoryName });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Tạo sản phẩm mới với thông tin đã cung cấp
        const newProduct = new ProductModel({ name, description, price, image, category: category._id });
        
        // Lưu sản phẩm mới vào cơ sở dữ liệu
        const savedProduct = await newProduct.save();
        
        // Trả về sản phẩm đã được lưu
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error });
    }
},
  

}
export default productController; 