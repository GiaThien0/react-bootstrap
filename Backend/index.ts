import express, { Router } from 'express';
import userRoute from './src/router/user'
import dotenv from 'dotenv';
import connectDB from './src/config/db'; 
const cors = require('cors');

dotenv.config();



import autheRouter from './src/router/user'

const app = express();
const port = process.env.PORT || 5000;

connectDB()

app.use(cors({
  origin: 'http://localhost:4000',
  credentials: true
}));


app.use(express.json());
app.use('/api',userRoute)

//router
app.use("/v1/auth", autheRouter);


// Middleware để xử lý dữ liệu JSON
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

