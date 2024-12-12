import CartModel from "../models/CartModel";
import OrderModel from "../models/oderModel"; // Đảm bảo đường dẫn đúng
import ProductModel from "../models/productModel";
import UserModel from "../models/userModel";
const qs = require('qs');
const crypto = require('crypto');

// Khai báo interface cho các tham số
interface VnpParams {
  [key: string]: string | number; // Cho phép các khóa có giá trị kiểu string hoặc number
}

const orderController = {
  checkout: async (req: any, res: any) => {
    const { totalAmount, paymentMethod, phone, address, products } = req.body;
    const { userId } = req.params;

    try {
      // Kiểm tra người dùng tồn tại và tính hợp lệ của các sản phẩm
      const user = await UserModel.findById(userId);
      if (!user) return res.status(404).json({ message: 'Người dùng không tồn tại.' });

      if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: 'Danh sách sản phẩm không hợp lệ.' });
      }

      // Tạo đơn hàng mới
      const newOrder = new OrderModel({
        user: userId,
        products,
        totalAmount,
        paymentMethod,
        phone,
        address,
        status: 'pending', // Trạng thái mặc định
      });

      // Lưu đơn hàng vào cơ sở dữ liệu
      await newOrder.save();

      if (paymentMethod === 'vnpay') {
        const tmnCode = "VW4CHF8Y"; // Mã TMN của bạn
        const secretKey = "FEWXXWKLFFOTOINDLREISFEZVKOFHXBU"; // Khóa bí mật của bạn
        const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        const returnUrl = 'http://localhost:4000/payment_return'; // URL trả về sau khi thanh toán

        const date = new Date();
        const createDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}`;
        const orderId = date.getTime(); // Tạo orderId duy nhất
        const orderInfo = 'Thanh toan don hang test';
        const orderType = 'billpayment';
        const locale = 'vn';
        const currCode = 'VND';
        const amount = totalAmount * 100; // Tính tiền bằng đơn vị đồng
        let ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.ip || '127.0.0.1';

        const vnpParams: Record<string, any> = {
          vnp_Version: '2.1.0',
          vnp_Command: 'pay',
          vnp_TmnCode: tmnCode,
          vnp_Locale: locale,
          vnp_CurrCode: currCode,
          vnp_TxnRef: orderId,
          vnp_OrderInfo: orderInfo,
          vnp_OrderType: orderType,
          vnp_Amount: amount,
          vnp_ReturnUrl: returnUrl,
          vnp_IpAddr: ipAddr,
          vnp_CreateDate: createDate,
        };

        // Sắp xếp tham số theo thứ tự bảng chữ cái
        const sortedParams = Object.keys(vnpParams)
          .sort()
          .reduce((result: any, key) => {
            result[key] = vnpParams[key];
            return result;
          }, {});

        const signData = qs.stringify(sortedParams, { encode: false });

        // Tạo chữ ký HMAC SHA256
        const hmac = crypto.createHmac('sha256', secretKey);
        const secureHash = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex').toUpperCase();

        sortedParams['vnp_SecureHash'] = secureHash;

        // Tạo URL thanh toán
        const paymentUrl = `${vnpUrl}?${qs.stringify(sortedParams, { encode: false })}`;
        console.log('Payment URL:', paymentUrl);
        console.log('Sign Data:', signData);
        console.log('Secure Hash:', secureHash);
        console.log('Sorted Params:', sortedParams);

        return res.status(201).json({ paymentUrl });
      } else {
        // Xử lý các phương thức thanh toán khác
        for (const item of products) {
          await ProductModel.findByIdAndUpdate(item.product, {
            $inc: { stock: -item.quantity }, // Giảm số lượng tồn kho
          });
        }

        await CartModel.findOneAndDelete({ user: userId }); // Xóa giỏ hàng sau khi thanh toán thành công

        return res.status(201).json({ message: 'Đơn hàng đã được tạo thành công.', order: newOrder });
      }
    } catch (error: any) {
      console.error("Lỗi xảy ra:", error);
      return res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại.', error: error.message });
    }
  },

  getOrderById: async (req: any, res: any) => {
    const { id } = req.params;

    try {
      const order = await OrderModel.findById(id)
        .populate('user', 'name email')
        .populate('products.product', 'name price image');

      if (!order) {
        res.status(404).json({ message: 'Đơn hàng không tồn tại.' });
        return;
      }

      res.status(200).json(order);
    } catch (error: any) {
      console.error("Lỗi xảy ra:", error);
      res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại.', error: error.message });
    }
  },

 // Cập nhật phương thức getCheckout để hỗ trợ phân trang
 getCheckout: async (req:any, res:any) => {
  const { page = 1, limit = 4 } = req.query; // Đặt limit mặc định là 4
  const skip = (page - 1) * limit;

  try {
    const orders = await OrderModel.find({ status: 'pending' })
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'products.product',
        select: 'image name',
      })
      .populate({
        path: 'user',
        select: 'email',
      });

    const totalOrders = await OrderModel.countDocuments({ status: 'pending' });
    const totalPages = Math.ceil(totalOrders / limit);

    res.status(200).json({ orders, totalPages, currentPage: page });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đọc đơn hàng', error });
  }
},



  // Cập nhật trạng thái đơn hàng
  updateOrderStatus: async (req:any, res:any) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const order = await OrderModel.findById(id);
  
      if (!order) {
        return res.status(404).json({ message: "Đơn hàng không tồn tại." });
      }
  
      if (!['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].includes(status)) {
        return res.status(400).json({ message: "Trạng thái không hợp lệ." });
      }
  
      order.status = status;
      await order.save();
  
      // Thêm log để kiểm tra
  
      return res.status(200).json({ message: "Trạng thái đơn hàng đã được cập nhật.", order });
    } catch (error:any) {
      return res.status(500).json({ message: "Có lỗi xảy ra. Vui lòng thử lại.", error: error.message });
    }
  },
  

  // Lấy danh sách đơn hàng theo trạng thái
  getOrdersByStatus: async (req:any, res:any) => {
    const { status } = req.params;
    const { page = 1, limit = 4 } = req.query; // Đặt limit mặc định là 4
    const skip = (page - 1) * limit;
  
    try {
      const orders = await OrderModel.find({ status })
        .skip(skip)
        .limit(limit)
        .populate('user', 'name email')
        .populate('products.product', 'name price image');
  
      const totalOrders = await OrderModel.countDocuments({ status });
      const totalPages = Math.ceil(totalOrders / limit);
  
      // Thêm log để kiểm tra
      console.log(`Fetched ${orders.length} orders with status ${status}`);
      res.status(200).json({ orders: orders || [], totalPages: totalPages || 1, currentPage: page });
    } catch (error:any) {
      res.status(500).json({ message: 'Lỗi khi đọc đơn hàng', error });
    }
  },
  
  
  // Thêm phương thức hủy đơn hàng
  cancelOrder: async (req:any, res:any) => {
    const { id } = req.params;
  
    try {
      const order = await OrderModel.findById(id);
  
      if (!order) {
        return res.status(404).json({ message: 'Đơn hàng không tồn tại.' });
      }
  
      // Cập nhật số lượng sản phẩm trong kho
      for (const item of order.products) {
        await ProductModel.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity } // Tăng số lượng tồn kho
        });
      }
  
      await OrderModel.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Đơn hàng đã được hủy và số lượng sản phẩm đã được cập nhật lại trong kho.' });
    } catch (error:any) {
      console.error("Lỗi xảy ra:", error);
      res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại.', error: error.message });
    }
  },
  

};

export default orderController;
