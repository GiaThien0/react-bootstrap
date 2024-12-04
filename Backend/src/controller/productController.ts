import ProductModel from '../models/productModel';
import CategoryModel from '../models/category';
import path from 'path'; // Để xử lý đường dẫn
import fs from 'fs'; // Để xóa file

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
    getProducts: async (req: any, res: any) => {
        try {
            // Sử dụng populate để lấy tên category cùng với sản phẩm
            const products = await ProductModel.find().populate('category', 'name');
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: "Error fetching products", error });
        }
    },

  adddprouctadm :async (req:any,res:any) =>{
    try {
        
        // Truy cập file đã được tải lên qua req.file
        const filePath = req.file?.path.replace(/\\/g, '/');

        // Tạo sản phẩm mới
        const product = new ProductModel({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: filePath, // Đường dẫn tới file hình ảnh
            category: req.body.category, // Nếu bạn có trường category trong form
        });
            
        // Lưu sản phẩm vào MongoDB
        await product.save();
        
        res.status(200).json({ message: 'File uploaded successfully!', product });
    } catch (error) {
        if (req.file) {
            // Xóa ảnh đã tải lên nếu có lỗi xảy ra trong quá trình lưu sản phẩm
            fs.unlinkSync(req.file.path); // Xóa ảnh đã tải lên nếu lưu sản phẩm thất bại
          }
        res.status(500).json({ error: 'Failed to upload file.' });
    }
  },



   deleteProductAdm : async (req :any, res :any) => {
    try {
        const { id } = req.params; // Lấy ID sản phẩm từ tham số URL

        // Tìm sản phẩm trong cơ sở dữ liệu
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Đường dẫn hình ảnh
        const imagePath = product.image; 
        const fullPath = path.join(__dirname, '..', '..', imagePath); // Cập nhật đường dẫn

        

        // Xóa sản phẩm khỏi cơ sở dữ liệu
        await ProductModel.findByIdAndDelete(id);

        // Xóa file hình ảnh từ hệ thống tệp
        fs.unlink(fullPath, (err) => {
            if (err) {
                console.error('Error deleting image:', err);
                return res.status(500).json({ error: 'Failed to delete image' });
            }
            console.log('Image deleted successfully:', fullPath);
        });

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
},


updateProduct: async (req: any, res: any) => {
    try {
        const { id } = req.params; // Lấy ID sản phẩm từ tham số URL

        // Tìm sản phẩm theo ID
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        // Nếu có file mới được tải lên, xử lý xóa file cũ và cập nhật đường dẫn file mới
        let updatedImagePath = product.image; // Mặc định là đường dẫn hình ảnh cũ
        if (req.file) {
            // Đường dẫn hình ảnh cũ
            const oldImagePath = path.join(__dirname, '..', '..', product.image);

            // Đường dẫn hình ảnh mới
            updatedImagePath = req.file.path.replace(/\\/g, '/'); // Chuyển đổi dấu \ sang /

            // Xóa hình ảnh cũ
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error('Error deleting old image:', err);
                } else {
                    console.log('Old image deleted successfully:', oldImagePath);
                }
            });
        }

        // Cập nhật thông tin sản phẩm
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            {
                name: req.body.name || product.name, // Cập nhật tên
                price: req.body.price !== undefined ? req.body.price : product.price, // Cập nhật giá nếu có
                description: req.body.description || product.description, // Cập nhật mô tả
                image: updatedImagePath, // Cập nhật đường dẫn hình ảnh
                category: req.body.category || product.category, // Cập nhật category
            },
            { new: true } // Trả về sản phẩm đã được cập nhật
        );

        // Kiểm tra xem sản phẩm đã được cập nhật hay chưa
        if (!updatedProduct) {
            return res.status(500).json({ message: 'Failed to update product' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
}

}
export default productController; 