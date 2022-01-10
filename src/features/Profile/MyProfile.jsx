import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../app/firebase/authService";
import { profileDataListener } from "../../app/firebase/firestore/teachersCollection";
import { selectUid } from "../auth/authSlice";
import "./MyProfile.css";
import { profileLoaded, selectProfileData } from "./profileSlice";

const MyProfile = () => {
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
  const navigate = useNavigate();
  useEffect(() => {
    profileDataListener(uid).onSnapshot((x) =>
      dispatch(profileLoaded(x.data()))
    );
  }, []);
  return (
    <div class="wrapper">
      <div class="profile-card js-profile-card">
        <div class="profile-card__img">
          <img src={photoURL} alt="profile card" />
        </div>

        <div class="profile-card__cnt js-profile-cnt">
          <div class="profile-card__name">{displayName}</div>
          <div class="profile-card__txt">
            Lecturer at <strong>KMIT</strong>
          </div>

          <div class="profile-card-inf">
            {profileDataEntries.map(
              (entry, index) =>
                !privateInfo.includes(entry[0]) &&
                !Array.isArray(entry[1]) && (
                  <div key={index} class="profile-card-inf__item">
                    <div class="profile-card-inf__title">
                      {entry[0].toUpperCase()}
                    </div>
                    <div class="profile-card-inf__txt">
                      <pre>{entry[1]}</pre>
                    </div>
                  </div>
                )
            )}

            {classes.map((cls, index) => (
              <div key={index} class="profile-card-inf__item">
                <div class="profile-card-inf__title">{`Class ${
                  index + 1
                }`}</div>
                <div
                  class="profile-card-inf__txt"
                  style={{ display: "inline-block" }}
                >
                  <pre>
                    {`Branch:${cls.branch.toUpperCase()}  Year:${
                      cls.year
                    }   Section:${cls.section}  Subject:${cls.subject}`}
                  </pre>
                </div>
              </div>
            ))}
          </div>

          <div class="profile-card-ctr">
            <button
              onClick={() => navigate("/home/editProfile", { replace: true })}
              class="profile-card__button button--blue js-message-btn"
            >
              Edit My Account
            </button>
            <button
              onClick={async () => {
                try {
                  await deleteUser();
                } catch (error) {
                  message.error(error.message);
                }
              }}
              class="profile-card__button button--orange"
            >
              Delete My Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
