import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './layout/Home/theme/Home';
import Hear from './Component/Hear/Hear';
import CustomNav from './Component/CustomNav/CustomNav';
import Products from './layout/Home/theme/Products';
import Contact from './layout/Home/theme/Contact';
import Address from './layout/Home/theme/Address';
import CustomFooter from './Component/CustomFooter/CustomFooter';

import Cardshoping from './layout/Home/theme/Cardshoping';
import Productdetail from './layout/Home/theme/Productdetail';




function App() {
  return (
    
    <Router>
    <Hear />
    <CustomNav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Address" element={<Address />} />
      <Route path="/Card" element={<Cardshoping />} />
      <Route path="/Producdetail" element={<Productdetail/>} />
    </Routes>
    <CustomFooter/>
  </Router>
    
  );
}

export default App;
