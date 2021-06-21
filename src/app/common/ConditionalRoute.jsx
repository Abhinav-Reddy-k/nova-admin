/* eslint-disable react/prop-types */
import React from "react";
import { Redirect, Route } from "react-router";

function ConditionalRoute({
  component: Component,
  redirectUrl,
  condition,
  ...rest
}) {
  return (
    <Route {...rest} redirectUrl>
      {!condition ? <Redirect to={redirectUrl} /> : <Component {...rest} />}
    </Route>
  );
}

export default ConditionalRoute;
