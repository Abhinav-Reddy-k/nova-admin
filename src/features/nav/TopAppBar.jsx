import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import { signOut } from "../../app/firebase/authService";

function TopAppBar() {
  return (
    <Menu
      mode="horizontal"
      style={{
        position: "sticky",
        zIndex: 1,
        width: "100%",
        display: "block",
      }}
    >
      <Menu.Item key="logout" onClick={signOut} style={{ float: "right" }}>
        Logout
      </Menu.Item>
      <Menu.Item key="profile" style={{ float: "right" }}>
        <Link to="/home/myprofile">Profile</Link>
      </Menu.Item>
    </Menu>
  );
}

export default TopAppBar;
