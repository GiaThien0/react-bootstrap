import express, { Router } from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db'; 
import productsRoute from './src/router/products'
import categoryRoute from './src/router/category'
import order from './src/router/order'
import cookieParser from 'cookie-parser';
import review from './src/router/rewiew'
import Banner from './src/router/Banner'; // Import bannerRoutes
import cart from './src/router/cart'
import Discount from './src/router/Discount'

const cors = require('cors');
dotenv.config();
const bodyParser = require('body-parser');



import autheRouter from './src/router/user'

const app = express();
const port = process.env.PORT || 5000;
app.use(cookieParser());
connectDB()

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow client & admin origins
  credentials: true,  // Allow credentials (cookies)
  
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
}));

app.use(bodyParser.json({ limit: '10mb' })); // Tăng giới hạn kích thước
app.use(express.json());
app.use("/v1/auth", autheRouter);

app.use('/uploads', express.static('uploads'));
app.use("/v1/auth", autheRouter);
//router

app.use("/v1/products",productsRoute );
app.use("/v1/category",categoryRoute);
app.use("/v1/cart",cart);
app.use("/v1/order",order);
app.use("/v1/review",review);
app.use("/v1/banner",Banner);
app.use("/v1/discount",Discount);

// Middleware để xử lý dữ liệu JSON
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

