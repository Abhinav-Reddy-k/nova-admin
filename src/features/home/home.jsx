import { Layout } from "antd";
import React, { Suspense } from "react";

import SideBar from "../nav/SideBar";
import TopAppBar from "../nav/TopAppBar";
import LoadingSpinner from "../../app/common/LoadingSpinner";
import { Outlet } from "react-router";

function Home() {
  const { Header, Content, Footer } = Layout;
  return (
    <>
      <Layout hasSider={true} style={{ height: "100vh" }}>
        <SideBar style={{ marginTop: "45px" }} />
        <Layout>
          <Header
            style={{
              padding: 0,
              background: "#fff",
              height: "45px",
              lineHeight: "45px",
            }}
          >
            <TopAppBar />
          </Header>
          <Content
            style={{
              display: "block",
              overflow: "scroll",
            }}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <Outlet />
            </Suspense>
          </Content>
          <Footer
            style={{ textAlign: "center", height: "20px", padding: "0px" }}
          >
            Nova ©2021 Created by Abhinav Reddy
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default Home;
