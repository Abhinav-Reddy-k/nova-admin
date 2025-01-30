import React from "react";

import { ReactComponent as NoConnectionSVG } from "../../assets/images/No-connection-bro.svg";

const NoConnection = () => {
  return (
    <div
      style={{
        width: 500,
        height: 500,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        marginTop: 100,
      }}
    >
      <NoConnectionSVG />
    </div>
  );
};

export default NoConnection;
