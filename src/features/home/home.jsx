import { Button, Layout, Typography } from "antd";
import React from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";

import SideBar from "../nav/SideBar";
import TopAppBar from "../nav/TopAppBar";
import { useDispatch, useSelector } from "react-redux";
import { selectDisplayName } from "../auth/authSlice";
import { useEffect } from "react";
import { studentTasksListener } from "../../app/firebase/firestore/studentsCollection";
import { tasksLoaded } from "./homeSlice";
import OnlineClasses from "../onlineClasses/OnlineClasses";

function Home() {
  const { Header, Sider, Content, Footer } = Layout;
  const username = useSelector(selectDisplayName);
  const dispatch = useDispatch();
  useEffect(() => {
    studentTasksListener(1, "cse", "A").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let tasks = [];
        let docData = doc.data();
        tasks.push({ ...docData, time: docData.time.toDate().toString() });
        dispatch(tasksLoaded(tasks));
      });
    });
  }, []);
  const { path } = useRouteMatch();
  console.log(`${path}/onlineClasses`);
  return (
    <>
      <TopAppBar />
      <Layout hasSider={true} style={{ minHeight: "100vh" }}>
        <SideBar />
        <Content style={{ marginTop: "50px" }}>
          <Typography.Title>Welcome {username}</Typography.Title>

          <Switch>
            <Route exact path={`${path}/onlineClasses`}>
              <OnlineClasses />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </>
  );
}

export default Home;
