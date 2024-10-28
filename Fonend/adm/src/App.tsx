import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter ,Outlet} from 'react-router-dom';
import Home from './home/Home';
import SideBar from './compoment/SideBar';
import Navbard from './compoment/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="d-flex">
          <div className=" vh-100">
            <SideBar />
          </div>
          <div className="vw-100">
            <Navbard />
            <Outlet></Outlet>
            <Routes>
              <Route path="/adm" element={<Home />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
