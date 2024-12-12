import React, { useState, useEffect } from 'react';
import './SideBar.css';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import logo from '../assats/logo.webp'
import { Image } from 'react-bootstrap';
function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed); // Chuyển đổi trạng thái
  };

  // Hàm để cập nhật trạng thái collapsed khi kích thước cửa sổ thay đổi
  const handleResize = () => {
    if (window.innerWidth < 768) { // Bạn có thể thay đổi kích thước tùy theo nhu cầu
      setCollapsed(true); // Thu gọn sidebar nếu màn hình nhỏ
    } else {
      setCollapsed(false); // Mở rộng sidebar nếu màn hình lớn
    }
  };

  // Theo dõi thay đổi kích thước cửa sổ
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Gọi hàm một lần để thiết lập trạng thái ban đầu

    // Dọn dẹp listener khi component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
      <Sidebar collapsed={collapsed} className='vh-100'>
      <div className="sidebar-header">
      <Image src={logo} thumbnail />
        </div>
        <Menu>
          <SubMenu label="Quan ly san pham va adm">
          <MenuItem component={<Link to="/adm" />}> admin</MenuItem>
          <MenuItem component={<Link to="/admproducts" />}>  Products</MenuItem>
          <MenuItem component={<Link to="/Banner" />}>Banner</MenuItem>

        </SubMenu>
        <SubMenu label="Quản lý đơn hàng">
        <MenuItem component={<Link to="/admOder" />}>Đơn hàng mới</MenuItem>
        <MenuItem component={<Link to="/Confirmed" />}>Sản phẩm đã được duyệt</MenuItem>
        <MenuItem component={<Link to="/Shiper" />}>Sản phẩm đang được giao hàng</MenuItem>

        
        </SubMenu>
          <MenuItem> Calendar </MenuItem>
        </Menu>
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
        >
        </Menu>
        <button onClick={handleToggleSidebar}>
          {collapsed ? 'Open Sidebar' : 'Close Sidebar'}
        </button>
      </Sidebar>
      
    
  );
}

export default SideBar;
