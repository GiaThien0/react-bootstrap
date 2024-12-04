import express, { Router } from 'express';
import userRoute from './src/router/user'
import dotenv from 'dotenv';
import connectDB from './src/config/db'; 
import productsRoute from './src/router/products'
import categoryRoute from './src/router/category'
import order from './src/router/order'
import cookieParser from 'cookie-parser';
import review from './src/router/rewiew'

import cart from './src/router/cart'
const cors = require('cors');
dotenv.config();
const bodyParser = require('body-parser');



import autheRouter from './src/router/user'

const app = express();
const port = process.env.PORT || 5000;

connectDB()

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Mảng chứa các origin
 
  credentials: true
}));
app.use(cookieParser());

app.use(bodyParser.json({ limit: '10mb' })); // Tăng giới hạn kích thước

app.use(express.json());
app.use('/api',userRoute)

app.use('/uploads', express.static('uploads'));

//router
app.use("/v1/auth", autheRouter);
app.use("/v1/products",productsRoute );
app.use("/v1/category",categoryRoute);
app.use("/v1/cart",cart);
app.use("/v1/order",order);
app.use("/v1/review",review);

// Middleware để xử lý dữ liệu JSON
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

