import { Layout } from "antd";
import React from "react";
import NavMenu from "./NavMenu";

function SideBarPhone({ collapsed }) {
  const { Sider } = Layout;
  return (
    <>
      <Sider
        trigger={null}
        collapsedWidth={0}
        theme="light"
        collapsible
        collapsed={collapsed}
        style={{ position: "absolute" }}
      >
        <NavMenu />
      </Sider>
    </>
  );
}

export default SideBarPhone;
