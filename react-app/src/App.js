
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './layout/Home/theme/Home';
import Hear from './Component/Hear/Hear';
import CustomNav from './Component/CustomNav/CustomNav';
import CustomCarousels from './Component/CustomCarousels/CustomCarousels';



function App() {
  return (
    
    <Router>
      <Hear/>
      <CustomNav/>
      <CustomCarousels/>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
    
  );
}

export default App;
