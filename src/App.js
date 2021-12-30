import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";

import ConditionalRoute from "./app/common/ConditionalRoute";
import {
  selectEmailVerified,
  selectIsAutheticated,
} from "./features/auth/authSlice";
import { selectHasProfileData } from "./features/Profile/profileSlice";

import "./App.css";
import { selectIsLoading } from "./features/home/homeSlice";
import LoadingSpinner from "./app/common/LoadingSpinner";

const Login = lazy(() => import("./features/auth/Login"));
const Home = lazy(() => import("./features/home/home"));
const VerifyEmail = lazy(() => import("./features/registration/VerifyEmail"));
const Register = lazy(() => import("./features/registration/RegisterEmail"));
const Profile = lazy(() =>
  import("./features/registration/RegisterProfileData")
);
const ResetPassword = lazy(() => import("./features/auth/ResetPassword"));

function App() {
  const isAuthenticated = useSelector(selectIsAutheticated);
  const isEmailVerified = useSelector(selectEmailVerified);
  const hasProfileData = useSelector(selectHasProfileData);
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Suspense fallback={<LoadingSpinner />}>
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
    </Suspense>
  );
}

export default App;
