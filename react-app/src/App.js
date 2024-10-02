import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './layout/Home/theme/Home';
import Hear from './Component/Hear/Hear';
import CustomNav from './Component/CustomNav/CustomNav';
import Products from './layout/Home/theme/Products';
import Contact from './layout/Home/theme/Contact';
import Address from './layout/Home/theme/Address';



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
    </Routes>
  </Router>
    
  );
}

export default App;
