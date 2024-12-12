import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './home/Home';
import SideBar from './compoment/SideBar';
import Navbard from './compoment/CustomNavbar/CustomNavbar';
import Products from './home/Products';
import Oder from './home/Oder';
import Banner from './home/Banner';

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
              <Route path="/admOder" element={<Oder />} />
              <Route path="/Banner" element={<Banner/>} />

            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
