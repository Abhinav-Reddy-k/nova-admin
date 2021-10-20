import { Layout, Menu } from "antd";
import React, { useState } from "react";
import {
  AiOutlineCode,
  AiOutlineCodeSandbox,
  AiTwotoneFileText,
} from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { FaBookReader, FaLaptopCode } from "react-icons/fa";
import { useRouteMatch, Link } from "react-router-dom";

function SideBar() {
  const { Sider } = Layout;
  const { SubMenu, Item } = Menu;
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => setCollapsed(collapsed);
  const { url } = useRouteMatch();
  return (
    <Sider
      width={200}
      theme="light"
      style={{
        marginTop: "45px",
        left: 0,
      }}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <Menu mode="inline">
        <Item key="onlineClasses" icon={<SiGoogleclassroom />}>
          <Link to="/home/onlineClasses">Online Classes</Link>
        </Item>

        <Item key="ide" icon={<AiOutlineCodeSandbox />}>
          <Link to="/home/ide">Code Editor</Link>
        </Item>

        <Item key="codetask" icon={<FaLaptopCode />}>
          <Link to="/home/test">Coding Test</Link>
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
        <SubMenu key="sub2" title="Results">
          <Item key="5">Java</Item>
          <Item key="6">os</Item>
        </SubMenu>
        <Item key="7" icon={<AiTwotoneFileText />}>
          Assignments
        </Item>
      </Menu>
    </Sider>
  );
}

export default SideBar;
