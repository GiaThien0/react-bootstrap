const multer  = require('multer')
import fs from 'fs'; // Import fs

// Đảm bảo thư mục 'uploads' tồn tại
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir); // Tạo thư mục nếu không tồn tại
}

// Cấu hình lưu trữ cho multer
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, uploadDir); // Chỉ định thư mục lưu trữ
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Tạo tên file duy nhất
    }
});

// Tạo upload middleware
const upload = multer({ storage: storage });

// Xuất khẩu middleware upload
export default upload;
