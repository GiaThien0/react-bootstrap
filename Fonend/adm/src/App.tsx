import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './home/Home';
import SideBar from './compoment/SideBar';
import Navbard from './compoment/Navbar/Navbar';
import Products from './home/Products';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="d-flex">
          <div className="vh-100">
            <SideBar />
          </div>
          <div className="vw-100">
            <Navbard />
            <Routes>
              <Route path="/adm" element={<Home />} />

              <Route path="/admproducts" element={<Products />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
