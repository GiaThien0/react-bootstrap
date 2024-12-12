import CartModel from "../models/CartModel";
import OrderModel from "../models/oderModel"; // Sửa tên model cho đúng
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

    getCheckout: async (req: any, res: any) => {
        try {
            const orders = await OrderModel.find({})
                .populate({
                    path: 'products.product',
                    select: 'image name',
                })
                .populate({
                    path: 'user',
                    select: 'email',
                });
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi đọc order', error });
        }
    },

    checkoutProductOrder: async (req: any, res: any) => {
        const { orderId, productId } = req.params;
        const { isApproved } = req.body;

        try {
            // Tìm đơn hàng theo orderId
            const order = await OrderModel.findById(orderId);
            if (!order) {
                return res.status(404).send({ message: 'Order not found' });
            }

            // Tìm sản phẩm trong mảng 'products' bằng cách so sánh với productId
            const product = order.products.find(p => p.product.toString() === productId);
            if (!product) {
                return res.status(404).send({ message: 'Product not found in the order' });
            }

            // Cập nhật trạng thái duyệt cho sản phẩm
            product.isApproved = isApproved;

            // Lưu đơn hàng sau khi cập nhật trạng thái sản phẩm
            await order.save();

            res.status(200).send({ message: 'Product approval status updated successfully', order });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating approval status' });
        }
    }
};

export default orderController;
