import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";

import ConditionalRoute from "./app/common/ConditionalRoute";
import {
  selectEmailVerified,
  selectIsAutheticated,
} from "./features/auth/authSlice";
import Login from "./features/auth/Login";
import ResetPassword from "./features/auth/ResetPassword";
import Home from "./features/home/home";
import { selectHasProfileData } from "./features/Profile/profileSlice";
import Profile from "./features/registration/RegisterProfileData";
import Register from "./features/registration/RegisterEmail";
import VerifyEmail from "./features/registration/VerifyEmail";

import "./App.css";
import { selectIsLoading } from "./features/home/homeSlice";
import LoadingSpinner from "./app/common/LoadingSpinner";

function App() {
  const isAuthenticated = useSelector(selectIsAutheticated);
  const isEmailVerified = useSelector(selectEmailVerified);
  const hasProfileData = useSelector(selectHasProfileData);
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Switch>
      <ConditionalRoute
        component={Login}
        path={"/login"}
        exact
        condition={!isAuthenticated}
        redirectUrl="/home"
      />

      <ConditionalRoute
        path={"/home"}
        component={Home}
        condition={isAuthenticated && isEmailVerified && hasProfileData}
        redirectUrl={
          !isAuthenticated
            ? "/login"
            : !isEmailVerified
            ? "/registration/verifyEmail"
            : "/registration/profile"
        }
      />

      <ConditionalRoute
        path={"/registration/register"}
        component={Register}
        condition={!isAuthenticated}
        exact
        redirectUrl={"/home"}
      />

      <ConditionalRoute
        path={"/registration/verifyEmail"}
        component={VerifyEmail}
        condition={isAuthenticated && !isEmailVerified}
        exact
        redirectUrl={isEmailVerified ? "/home" : "/login"}
      />

      <ConditionalRoute
        path={"/registration/profile"}
        component={Profile}
        condition={isAuthenticated && isEmailVerified && !hasProfileData}
        exact
        redirectUrl={"/home"}
      />

      <Route path="/resetPassword">
        <ResetPassword />
      </Route>

      <Redirect to={"/home"} />
    </Switch>
  );
}

export default App;
