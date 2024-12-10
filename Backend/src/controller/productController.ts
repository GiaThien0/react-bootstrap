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
        const filePath = req.file?.path.replace(/\\/g, '/');
        const stockValue = parseInt(req.body.stock || 0, 10);

        // Kiểm tra giá trị stock
        if (stockValue < 0) {
            if (req.file) {
                fs.unlinkSync(req.file.path); // Xóa file nếu có lỗi
            }
            return res.status(400).json({ error: 'Stock value cannot be negative.' });
        }

        // Tạo sản phẩm mới với thông tin từ request
        const product = new ProductModel({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: filePath,
            category: req.body.category,
            stock: stockValue, // Gán giá trị stock
        });

        // Lưu sản phẩm vào database
        await product.save();

        res.status(200).json({ message: 'Product added successfully!', product });
    } catch (error) {
        if (req.file) {
            // Xóa ảnh đã tải lên nếu có lỗi
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ error: 'Failed to add product.', details: error });
    }
  },



 
  deleteProductAdm: async (req: any, res: any) => {
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
  
          // Kiểm tra xem tệp có tồn tại không trước khi xóa
          fs.access(fullPath, fs.constants.F_OK, (err) => {
              if (err) {
                  console.log('Image not found, skipping deletion');
                  // Nếu tệp không tồn tại, bỏ qua phần xóa hình ảnh
                  return res.status(200).json({ message: 'Product deleted successfully, but image not found' });
              }
  
              // Nếu tệp tồn tại, xóa tệp
              fs.unlink(fullPath, (err) => {
                  if (err) {
                      console.error('Error deleting image:', err);
                      return res.status(500).json({ error: 'Failed to delete image' });
                  }
                  console.log('Image deleted successfully:', fullPath);
                  res.status(200).json({ message: 'Product and image deleted successfully' });
              });
          });
  
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

        // Xử lý hình ảnh mới nếu được tải lên
        let updatedImagePath = product.image;
        if (req.file) {
            const oldImagePath = path.join(__dirname, '..', '..', product.image);
            updatedImagePath = req.file.path.replace(/\\/g, '/');
            fs.unlink(oldImagePath, (err) => {
                if (err) console.error('Error deleting old image:', err);
            });
        }

        // Cập nhật thông tin sản phẩm
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            {
                name: req.body.name || product.name,
                price: req.body.price !== undefined ? req.body.price : product.price,
                description: req.body.description || product.description,
                image: updatedImagePath,
                category: req.body.category || product.category,
                stock: req.body.stock !== undefined ? parseInt(req.body.stock, 10) : product.stock, // Cập nhật stock
            },
            { new: true } // Trả về sản phẩm đã được cập nhật
        );

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product.' });
    }
}

}
export default productController; 