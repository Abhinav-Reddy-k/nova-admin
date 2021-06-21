import { Button, message } from "antd";
import React from "react";
import { useSelector } from "react-redux";

import { sendEmailVerification } from "../../app/firebase/authService";
import { selectEmail } from "./../auth/authSlice";
import ReistrationSteps from "./ReistrationSteps";

function VerifyEmail() {
  const sendMail = async () => {
    try {
      sendEmailVerification();
      message.info("A verification email is sent!!");
    } catch (error) {
      message.error(error.message);
    }
  };
  const email = useSelector(selectEmail);
  return (
    <>
      <ReistrationSteps currentStep={1} />

      <p align="center" style={{ marginTop: "70px" }}>
        <img
          src="https://tlr.stripocdn.email/content/guids/CABINET_2663efe83689b9bda1312f85374f56d2/images/10381620386430630.png"
          alt="https://randon.jpg"
          style={{ display: "block" }}
          width="100"
        />
        <br />
        <h2>Verify your email to finish signing up</h2>
        <br />
        Thank you for choosing NOVA.
        <br />
        <br /> Please confirm that{" "}
        <strong>
          <a
            target="_blank"
            href="mailto:colin_washington@email.com"
            rel="noreferrer"
          >
            {email}
          </a>
        </strong>
        &nbsp;is your email address by clicking on the button within{" "}
        <strong>48 hours</strong>.
        <br />
        <br />
        <Button onClick={sendMail}> Verify my email</Button>
        <Button onClick={() => window.location.reload()}>Next</Button>
      </p>
    </>
  );
}

export default VerifyEmail;
