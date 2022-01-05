import propTypes from "prop-types";
import React from "react";
import { Navigate, Outlet } from "react-router";

function ConditionalRoute({ redirectUrl, condition }) {
  return <>{!condition ? <Navigate to={redirectUrl} /> : <Outlet />}</>;
}

export default ConditionalRoute;

ConditionalRoute.propTypes = {
  redirectUrl: propTypes.string.isRequired,
  condition: propTypes.bool.isRequired,
};
