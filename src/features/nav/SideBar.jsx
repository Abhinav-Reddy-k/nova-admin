import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { AiOutlineCodeSandbox, AiTwotoneFileText } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { FaBookReader, FaLaptopCode } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { ImUserCheck } from "react-icons/im";

function SideBar() {
  const { Sider } = Layout;
  const { SubMenu, Item } = Menu;
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => setCollapsed(collapsed);
  return (
    <Sider
      width={200}
      theme="light"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <Menu mode="inline" defaultSelectedKeys={["logo"]}>
        <Item key="logo" icon={<MdDashboard />}>
          <Link to="/home" replace>
            Nova Admin
          </Link>
        </Item>
        <Item key="onlineClasses" icon={<SiGoogleclassroom />}>
          <Link to="/home/onlineClasses">Online Classes</Link>
        </Item>

        <Item key="ide" icon={<AiOutlineCodeSandbox />}>
          <Link to="/home/ide">Code Editor</Link>
        </Item>

        <Item key="codetask" icon={<FaLaptopCode />}>
          <Link to="/home/test">Coding Test</Link>
        </Item>

        <Item key="attendance" icon={<ImUserCheck />}>
          <Link to="/home/attendance">Attendance</Link>
        </Item>
        <Item key="resources" icon={<ImUserCheck />}>
          <Link to="/home/resources">Resources</Link>
        </Item>

        <SubMenu key="sub1" title="Study Material" icon={<FaBookReader />}>
          <Item
            key="2"
            onClick={(info) => {
              console.log(info);
            }}
          >
            Java
          </Item>
          <Item key="3">Os</Item>
          <Item key="4">DBMS</Item>
        </SubMenu>

        <Item key="7" icon={<AiTwotoneFileText />}>
          Assignments
        </Item>
      </Menu>
    </Sider>
  );
}

export default SideBar;
