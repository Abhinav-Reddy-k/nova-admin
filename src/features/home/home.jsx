import { Layout, Typography } from "antd";
import React, { lazy, Suspense } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import SideBar from "../nav/SideBar";
import TopAppBar from "../nav/TopAppBar";
import { useSelector } from "react-redux";
import { selectDisplayName } from "../auth/authSlice";
import LoadingSpinner from "../../app/common/LoadingSpinner";

const OnlineClasses = lazy(() => import("../onlineClasses/OnlineClasses"));
const MyProfile = lazy(() => import("../Profile/MyProfile"));
const EditProfile = lazy(() => import("../Profile/EditProfile"));
const CodeEditor = lazy(() => import("../ide/CodeEditor"));
const CodingTasks = lazy(() => import("../ide/CodingTasks"));
const NewCodeTestForm = lazy(() => import("../ide/NewCodeTestForm"));
const CodeAttempt = lazy(() => import("../ide/CodeAttempt"));

function Home() {
  const { Header, Content, Footer } = Layout;
  const username = useSelector(selectDisplayName);

  const { path } = useRouteMatch();
  console.log(`${path}/onlineClasses`);
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
              <Switch>
                <Route exact path="/home">
                  <Typography.Title>Welcome {username}</Typography.Title>
                </Route>
                <Route exact path="/home/onlineClasses">
                  <OnlineClasses />
                </Route>
                <Route exact path="/home/myprofile">
                  <MyProfile />
                </Route>
                <Route exact path="/home/editProfile">
                  <EditProfile />
                </Route>
                <Route exact path="/home/ide">
                  <CodeEditor />
                </Route>
                <Route exact path="/home/test">
                  <CodingTasks />
                </Route>
                <Route path="/home/test/new">
                  <NewCodeTestForm />
                </Route>
                <Route path="/home/test/attempt/:title">
                  <CodeAttempt />
                </Route>
                <Redirect to="/home" />
              </Switch>
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
