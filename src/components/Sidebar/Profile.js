import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import Icon from "components/Icon";
import { getUserDAta } from "utils/userData";
import { getUserProfile } from "../../Redux/Actions/sideBar";
import { generateToken } from "utils/generateToken";
import { getUser } from "Redux/Actions/createUser";
import { ToastContainer, toast } from "react-toastify";
import { notifyError, notifySuccess } from "../../utils/notification";
import uuid from "react-uuid";
import axios from "axios";

let { REACT_APP_SERVER_URL } = process.env;

const UserProfile = (props) => {
  let { state, stateMethod, userData } = props.parentState;
  let [uiState, changeUiState] = useState(false);
  let [disAbleButton, setDisableButton] = useState(false);
  let [buttonUi, setButtonUi] = useState({
    editName: false,
    editAbout: false,
  });
  let [file, setFile] = useState();
  let [userInput, setUserInput] = useState({
    userName: "",
    userAbout: "",
  });

  const select = useSelector((e) => {
    return e;
  });

  // console.log(select.userState.data);

  const dispatch = useDispatch();

  const override = css`
    display: block;
    margin: 2em auto;
    border-color: #ffffff;
  `;
  const uploadFile = (e) => {
    e.preventDefault();
    setDisableButton(true);
    const fData = new FormData();
    fData.append("Uid", uuid());
    fData.append("userName", userInput.userName);
    fData.append("userAbout", userInput.userAbout);
    fData.append("created_by", getUserDAta()._id);
    fData.append("file", file);

    axios
      .put(`${REACT_APP_SERVER_URL}api/v1/users/updateProfile`, fData, {
        headers: {
          "access-token": generateToken(),
          "user-id": getUserDAta()._id,
        },
      })
      .then((res) => {
        if (res.data) {
          changeUiState(false);
          setDisableButton(false);
          dispatch(getUser(userData._id));
          notifySuccess(res.data.message);
        }
      })
      .catch((err) => {
        changeUiState(false);
        setDisableButton(false);
        notifyError("Failed to upload image please try again later");
        // console.log(err);
      });
  };
  return (
    <>
      <aside className="sidebar  header_sidebar_container">
        <header className="header_sidebar">
          <div className="header_sidebar_content">
            <Icon
              className="back_pointer"
              id="back"
              onClick={() => {
                dispatch(getUserProfile());
              }}
            />
            <p>Profile</p>
          </div>
        </header>
        <div className="sidebar__contacts">
          <div className="profile__section profile__section--personal">
            <div className="profile__avatar-wrapper">
              <img
                src={`${REACT_APP_SERVER_URL}api/v1/users/getImage/${select.userState.data.profileImage}`}
                alt={select.userState.data.name}
                className="avatar"
              />

              <button className="profile_btn">
                <input
                  type="file"
                  id="file"
                  required="required"
                  className="profile_btn"
                  onChange={(e) => {
                    changeUiState(true);
                    const file = e.target.files[0];
                    setFile(file);
                  }}
                />
                Add Image
              </button>
            </div>

            {/* <h2 className="profile__name"> {userData.name} </h2> */}
            <div className="username_container">
              <input
                className={`profile__name ${
                  buttonUi.editName ? "inputActive" : ""
                }`}
                type="text"
                defaultValue={select.userState.data.name}
                readOnly={buttonUi.editName ? false : true}
                onChange={(e) => {
                  changeUiState(true);
                  setUserInput({
                    ...userInput,
                    userName: e.target.value,
                  });
                }}
              />
              <button
                className="edit-name"
                onClick={() => {
                  setButtonUi({
                    ...buttonUi,
                    editName: !buttonUi.editName,
                  });
                }}
              >
                {buttonUi.editName ? (
                  <Icon className="" id="singleTick" />
                ) : (
                  "Edit"
                )}
              </button>
            </div>
          </div>
          <p className="user_info_data">
            This is not your username or pin. This name will be visible to your
            WhatsApp contacts.
          </p>
          <div className="user_info">
            <p className="user_name">About</p>
            <div className="user_about">
              <textarea
                className={`${buttonUi.editAbout ? "textAreaActive" : ""}`}
                readOnly={buttonUi.editAbout ? false : true}
                defaultValue={select.userState.data.userAbout}
                onChange={(e) => {
                  changeUiState(true);
                  setUserInput({
                    ...userInput,
                    userAbout: e.target.value,
                  });
                }}
              />
              <button
                className="edit-about"
                onClick={() => {
                  setButtonUi({
                    ...buttonUi,
                    editAbout: !buttonUi.editAbout,
                  });
                }}
              >
                {buttonUi.editAbout ? (
                  <Icon className="" id="singleTick" />
                ) : (
                  "Edit"
                )}
              </button>
            </div>
          </div>
          {uiState ? (
            <button
              className="group_button group_button_create profileSubmit"
              onClick={uploadFile}
              disabled={disAbleButton}
              type="submit"
            >
              {disAbleButton ? (
                <ClipLoader color="#00bfa5" css={override} size={20} />
              ) : (
                <Icon className="" id="singleTick" />
              )}
            </button>
          ) : null}
        </div>
        <ToastContainer />
      </aside>
    </>
  );
};

export default UserProfile;
