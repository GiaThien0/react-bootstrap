import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Home from './layout/Home/theme/Home';
import Hear from './Component/Hear/Hear';
import CustomNav from './Component/CustomNav/CustomNav';
import Products from './layout/Home/theme/Products';
import Contact from './layout/Home/theme/Contact';
import Address from './layout/Home/theme/Address';
import CustomFooter from './Component/CustomFooter/CustomFooter';
import 'bootstrap/dist/css/bootstrap.min.css';

import Cardshoping from './layout/Home/theme/Cardshoping';
import Productdetail from './layout/Home/theme/Productdetail';
import ChechkoutPage from './layout/Home/theme/ChechkoutPage';
import Login from './layout/Home/theme/Login';
import Register from './layout/Home/theme/register';
import User from './layout/Home/theme/User';
import ForgotPassword from './Component/comment/ForgotPassword';
import ResetPassword from './Component/comment/ResetPassword';
import VNPAYPayment from './layout/Home/theme/VNPAYPayment';


const App: React.FC = () => {
    
    return (
        <Router>
            <Hear />
            <CustomNav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Products" element={<Products />} /> {/* Cập nhật đường dẫn */}
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Address" element={<Address />} />
                <Route path="/Card" element={<Cardshoping />} />
                <Route path="/Productdetail/:id" element={<Productdetail />} />
                <Route path="/Checkout" element={<ChechkoutPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/User" element={<User />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route path="/ResetPassword" element={<ResetPassword />} />
                <Route path="/VNPAYPayment" element={<VNPAYPayment />} />


            </Routes>
            <CustomFooter />
        </Router>
    );
};

export default App;
