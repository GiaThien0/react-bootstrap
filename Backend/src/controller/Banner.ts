import fs from 'fs';
import path from 'path';
import BannerModel from '../models/Banner';

const BannerController = {
    getBanners: async (req:any, res:any) => {
        try {
            const banners = await BannerModel.find({});
            res.status(200).json(banners);
        } catch (error:any) {
            res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách banner.', error: error.message });
        }
    },

    addBanner: async (req:any, res:any) => {
        try {
            const filePath = req.file?.path.replace(/\\/g, '/');
            const { link, position, section, description } = req.body; // Thêm description

            // Tạo banner mới với thông tin từ request
            const newBanner = new BannerModel({
                link,
                position,
                section,
                description, // Gán description, có thể không bắt buộc
                imageUrl: filePath
            });

            // Lưu banner vào database
            await newBanner.save();
            res.status(201).json({ message: 'Banner đã được thêm thành công.', banner: newBanner });
        } catch (error:any) {
            if (req.file) {
                // Xóa ảnh đã tải lên nếu có lỗi
                fs.unlinkSync(req.file.path);
            }
            res.status(500).json({ error: 'Có lỗi xảy ra khi thêm banner.', details: error });
        }
    },

    updateBanner: async (req:any, res:any) => {
        const { id } = req.params;
        const { link, position, section, description } = req.body; // Thêm description

        try {
            const banner = await BannerModel.findById(id);
            if (!banner) {
                return res.status(404).json({ message: 'Banner không tồn tại.' });
            }

            // Xử lý hình ảnh mới nếu được tải lên
            let updatedImagePath = banner.imageUrl;
            if (req.file) {
                const oldImagePath = path.join(__dirname, '..', '..', banner.imageUrl);
                updatedImagePath = req.file.path.replace(/\\/g, '/');
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.error('Error deleting old image:', err);
                });
            }

            // Cập nhật thông tin banner
            const updatedBanner = await BannerModel.findByIdAndUpdate(
                id,
                {
                    link: link || banner.link,
                    position: position || banner.position,
                    section: section || banner.section,
                    description: description || banner.description, // Cập nhật description, có thể không bắt buộc
                    imageUrl: updatedImagePath
                },
                { new: true } // Trả về banner đã được cập nhật
            );

            res.status(200).json({ message: 'Banner đã được cập nhật thành công.', banner: updatedBanner });
        } catch (error:any) {
            console.error('Error updating banner:', error);
            res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật banner.', error: error.message });
        }
    },

    deleteBanner: async (req:any, res:any) => {
        const { id } = req.params;

        try {
            const banner = await BannerModel.findByIdAndDelete(id);

            if (!banner) {
                return res.status(404).json({ message: 'Banner không tồn tại.' });
            }

            // Đường dẫn hình ảnh
            const imagePath = banner.imageUrl; 
            const fullPath = path.join(__dirname, '..', '..', imagePath);

            // Kiểm tra xem tệp có tồn tại không trước khi xóa
            fs.access(fullPath, fs.constants.F_OK, (err) => {
                if (err) {
                    console.log('Image not found, skipping deletion');
                    // Nếu tệp không tồn tại, bỏ qua phần xóa hình ảnh
                    return res.status(200).json({ message: 'Banner đã được xóa thành công, nhưng tệp hình ảnh không tồn tại' });
                }

                // Nếu tệp tồn tại, xóa tệp
                fs.unlink(fullPath, (err) => {
                    if (err) {
                        console.error('Error deleting image:', err);
                        return res.status(500).json({ error: 'Có lỗi xảy ra khi xóa hình ảnh' });
                    }
                    console.log('Image deleted successfully:', fullPath);
                    res.status(200).json({ message: 'Banner và hình ảnh đã được xóa thành công' });
                });
            });
        } catch (error:any) {
            console.error('Error deleting banner:', error);
            res.status(500).json({ message: 'Có lỗi xảy ra khi xóa banner.', error: error.message });
        }
    }
};

export default BannerController;
