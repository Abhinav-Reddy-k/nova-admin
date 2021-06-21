import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import { signOut } from "../../app/firebase/authService";

function TopAppBar() {
  return (
    <Menu
      mode="horizontal"
      style={{ position: "fixed", width: "100%" }}
      defaultSelectedKeys={["logo"]}
    >
      <Menu.Item key="logo">
        <Link to="/home">NOVA-ADMIN</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={signOut} style={{ float: "right" }}>
        Logout
      </Menu.Item>
      <Menu.Item key="profile" style={{ float: "right" }}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
    </Menu>
  );
}

export default TopAppBar;
