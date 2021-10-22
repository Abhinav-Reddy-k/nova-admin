import { Layout, Typography } from "antd";
import React from "react";
import { Switch, Route, useRouteMatch, Link, Redirect } from "react-router-dom";

import SideBar from "../nav/SideBar";
import TopAppBar from "../nav/TopAppBar";
import { useDispatch, useSelector } from "react-redux";
import { selectDisplayName } from "../auth/authSlice";
import OnlineClasses from "../onlineClasses/OnlineClasses";
import CodeEditor from "../ide/CodeEditor";
import MyProfile from "../Profile/MyProfile";
import EditProfile from "../Profile/EditProfile";
import CodingTasks from "../ide/CodingTasks";
import CodeAttempt from "../ide/CodeAttempt";
import NewCodeTestForm from "../ide/NewCodeTestForm";

function Home() {
  const { Header, Sider, Content, Footer } = Layout;
  const username = useSelector(selectDisplayName);

  const { path } = useRouteMatch();
  console.log(`${path}/onlineClasses`);
  return (
    <>
      <Layout hasSider={true}>
        <SideBar />

        <TopAppBar />
        <Content
          style={{
            marginTop: "50px",
            minHeight: "90vh",
            display: "block",
          }}
        >
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
        </Content>
      </Layout>
    </>
  );
}

export default Home;
