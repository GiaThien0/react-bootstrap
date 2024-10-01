
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './layout/Home/Home';
import { Navbar } from 'react-bootstrap';
import Hear from './Component/Hear/Hear';
function App() {
  return (
    
    <Router>
      <Hear/>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
    
  );
}

export default App;
