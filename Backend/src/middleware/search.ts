import unidecode from "unidecode";
import ProductModel from "../models/productModel";

const usermiddleware ={

  search: async (req:any, res:any) => {
    const { query } = req.query;  // Lấy query từ URL

    if (!query) {
      return res.status(400).json({ message: 'Từ khóa tìm kiếm không hợp lệ.' });
    }

    try {
      // Chuẩn hóa từ khóa tìm kiếm (loại bỏ dấu)
      const normalizedQuery = unidecode(query);

      // Tìm kiếm sản phẩm trong cơ sở dữ liệu
      const products = await ProductModel.find({
        name: { $regex: normalizedQuery, $options: 'i' } // Tìm kiếm không phân biệt chữ hoa/thường và dấu
      });

      res.json(products);  // Trả về sản phẩm dưới dạng JSON
    } catch (error) {
      console.error("Error searching products:", error);
      res.status(500).json({ message: 'Lỗi khi tìm kiếm sản phẩm.' });
    }
  }
}

    export default usermiddleware; // Xuất mặc định