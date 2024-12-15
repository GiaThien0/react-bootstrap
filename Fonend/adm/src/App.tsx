import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './home/Home';
import SideBar from './compoment/SideBar';
import Navbard from './compoment/CustomNavbar/CustomNavbar';
import Products from './home/Products';
import Oder from './home/Oder';
import Banner from './home/Banner';
import Confirmed from './home/Confirmed';
import Shiper from './home/Shiper';
import Discout from './home/Discout';
import AssignDDiscount from './home/AssignDiscount';

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
              <Route path="/Confirmed" element={<Confirmed/>} />
              <Route path="/Shiper" element={<Shiper/>} />
              <Route path="/Discout" element={<Discout/>} />
              <Route path="/AssignDDiscount" element={<AssignDDiscount/>} />


            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
