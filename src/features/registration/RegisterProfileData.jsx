import React from "react";

import TeachersProfile from "../Profile/TeachersProfileForm";
import ReistrationSteps from "./ReistrationSteps";

function Profile() {
  return (
    <>
      <ReistrationSteps currentStep={2} />

      <TeachersProfile />
    </>
  );
}

export default Profile;
