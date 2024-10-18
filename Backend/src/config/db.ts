import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Tải biến môi trường từ file .env
dotenv.config();

// Đường dẫn kết nối MongoDB
const mongoUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.gzdllvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Hàm kết nối đến MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log(`Connected to the database successfully!`);
    } catch (error) {
        console.log(`Cannot connect to the database: ${error}`);
    }
};

// Xuất hàm kết nối
export default connectDB;


