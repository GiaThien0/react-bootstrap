import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true }, 
    link: { type: String, required: true }, 
    position: { type: String, required: true }, // Vị trí trang (home, product) 
    section: { type: String, required: true }, // Khu vực cụ thể (header, footer, sidebar, etc.) 
    description: { type: String, required: false }, // Thêm trường description
    createdAt: { type: Date, default: Date.now }, 
    updatedAt: { type: Date, default: Date.now }
});

const Banner = mongoose.model('Banner', BannerSchema);

export default Banner;
