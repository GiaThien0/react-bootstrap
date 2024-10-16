import express from 'express';

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './src/router/user';


// Tải biến môi trường từ file .env
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const mongoUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.gzdllvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
`;


app.use('/auth',userRouter)








const connectDB = async ()=>{
    try{
        await mongoose.connect(mongoUri)
        console.log(`connect to db succesfully!!`)
        
    }catch(error){
        console.log(`Can not connect to db${error}`)
    }
};
connectDB().then(()=>{
   
}).catch((error) =>{
    console.log(error)

})





// Middleware để xử lý dữ liệu JSON
app.use(express.json());
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
// Định nghĩa một route cơ bản
app.get('/', (req, res) => {
  res.send('Hello World!');
});

