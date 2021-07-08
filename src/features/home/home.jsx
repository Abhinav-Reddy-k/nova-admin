import { Layout, Typography } from "antd";
import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import SideBar from "../nav/SideBar";
import TopAppBar from "../nav/TopAppBar";
import { useDispatch, useSelector } from "react-redux";
import { selectDisplayName } from "../auth/authSlice";
import OnlineClasses from "../onlineClasses/OnlineClasses";
import CodeEditor from "../ide/CodeEditor";
import MyProfile from "../Profile/MyProfile";
import EditProfile from "../Profile/EditProfile";

function Home() {
  const { Header, Sider, Content, Footer } = Layout;
  const username = useSelector(selectDisplayName);

  const { path } = useRouteMatch();
  console.log(`${path}/onlineClasses`);
  return (
    <>
      <Layout hasSider={true}>
        <TopAppBar />
        <SideBar />
        <Content
          style={{
            marginTop: "50px",
            minHeight: "90vh",
            display: "block",
          }}
        >
          <Switch>
            <Route exact path={`${path}`}>
              <Typography.Title>Welcome {username}</Typography.Title>
            </Route>
            <Route exact path={`${path}/onlineClasses`}>
              <OnlineClasses />
            </Route>
            <Route path={`/home/myprofile`}>
              <MyProfile />
            </Route>
            <Route path={`${path}/editProfile`}>
              <EditProfile />
            </Route>
            <Route path={`${path}/ide`}>
              <CodeEditor />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </>
  );
}

export default Home;
