import { Avatar, Col, Descriptions, Image, Row, Button, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../app/firebase/authService";
import { profileDataListener } from "../../app/firebase/firestore/teachersCollection";
import { selectUid } from "../auth/authSlice";
import { profileLoaded, selectProfileData } from "./profileSlice";
import { Link, useHistory } from "react-router-dom";

function ProfileData() {
  let profileData = useSelector(selectProfileData);
  const { displayName, photoURL, classes } = profileData;
  let profileDataEntries = Object.entries(profileData);
  const privateInfo = [
    "attendance",
    "to_year",
    "from_year",
    "uid",
    "photoURL",
    "isTeacher",
  ];
  const uid = useSelector(selectUid);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    console.log("called");
    profileDataListener(uid).onSnapshot((x) =>
      dispatch(profileLoaded(x.data()))
    );
  }, []);
  return (
    <>
      <Row align="middle" justify="space-around">
        <Col
          span={18}
          style={{
            justifyContent: "center",
            display: "flex",
            margin: "30px 0 30px 0",
          }}
        >
          {photoURL ? (
            <Avatar size={300} src={<Image src={photoURL} />} />
          ) : (
            <Avatar
              size={100}
              style={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
              }}
            >
              {displayName}
            </Avatar>
          )}
        </Col>
      </Row>
      <Row justify="center">
        <Descriptions bordered>
          {profileDataEntries.map(
            (entry) =>
              !privateInfo.includes(entry[0]) &&
              !Array.isArray(entry[1]) && (
                <Descriptions.Item
                  key={entry[0]}
                  label={entry[0].toUpperCase()}
                >
                  {entry[1]}
                </Descriptions.Item>
              )
          )}

          <Descriptions.Item label="Classes">
            {classes.map((cls) => (
              <p key={cls.subject}>
                {`Branch : ${cls.branch} Year : ${cls.year} Section: ${cls.section} Subject: ${cls.subject}`}
              </p>
            ))}
          </Descriptions.Item>
        </Descriptions>
      </Row>
      <Button
        danger
        onClick={async () => {
          try {
            await deleteUser();
          } catch (error) {
            message.error(error.message);
          }
        }}
      >
        Delete My Account
      </Button>
      <Button onClick={() => history.replace("/editProfile")}>
        Edit My Profile
      </Button>
    </>
  );
}

export default ProfileData;
