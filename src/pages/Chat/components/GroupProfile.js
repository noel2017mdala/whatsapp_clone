import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import groupAvatar from "assets/images/women.png";
import media from "assets/images/placeholder.jpeg";
import Checkbox from "components/Checkbox";
import Icon from "components/Icon";
import { getUserDAta } from "utils/userData";
import { newGroupList } from "Redux/Actions/sideBar";
import ClipLoader from "react-spinners/ClipLoader";
import { generateToken } from "utils/generateToken";
import uuid from "react-uuid";
import { ToastContainer, toast } from "react-toastify";
import { css } from "@emotion/react";
import { notifySuccess, notifyError } from "../../../utils/notification";
import { getGroupData } from "Redux/Actions/groupAction";
import { fetchContactList } from "Redux/Actions/fetchUser";
import axios from "axios";
let { REACT_APP_SERVER_URL } = process.env;

const GroupDetails = (props) => {
  const { group, openProfileSidebar, openSearchSidebar } = props;
  const dispatch = useDispatch();
  let [buttonUi, setButtonUi] = useState({
    editName: false,
  });
  let [uiState, changeUiState] = useState(false);
  let [userInput, setUserInput] = useState({
    groupName: "",
  });
  let [file, setFile] = useState();
  let [disAbleButton, setDisableButton] = useState(false);

  const select = useSelector((e) => {
    return e;
  });

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
    fData.append("groupName", userInput.groupName);
    fData.append("created_by", getUserDAta()._id);
    fData.append("group_id", group.data._id);
    fData.append("file", file);
    console.log(fData);
    axios
      .put(`${REACT_APP_SERVER_URL}api/v1/group/updateGroupProfile`, fData, {
        headers: {
          "access-token": generateToken(),
          "user-id": getUserDAta()._id,
        },
      })
      .then((res) => {
        if (res.data) {
          changeUiState(false);
          setDisableButton(false);
          dispatch(getGroupData(group.data._id));
          dispatch(fetchContactList(getUserDAta()));
          notifySuccess(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="profile">
      {group.data ? (
        <div className="profile">
          <div className="profile__section profile__section--personal">
            <div className="profile__avatar-wrapper">
              <img
                src={`${REACT_APP_SERVER_URL}api/v1/users/getImage/${group.data.groupProfile}`}
                alt={group.data.groupName}
                className="avatar"
              />
              {group.data.groupAdmin.includes(getUserDAta()._id) ? (
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
              ) : (
                ""
              )}
            </div>

            <div className="username_container">
              <input
                className={`profile__name ${
                  buttonUi.editName ? "inputActive" : ""
                }`}
                type="text"
                defaultValue={group.data.groupName}
                readOnly={buttonUi.editName ? false : true}
                onChange={(e) => {
                  changeUiState(true);
                  setUserInput({
                    ...userInput,
                    groupName: e.target.value,
                  });
                }}
              />

              {group.data.groupAdmin.includes(getUserDAta()._id) ? (
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
              ) : (
                ""
              )}

              {uiState ? (
                <button
                  className="group_button group_button_edit"
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
          </div>

          <div className="profile__section profile__section--media">
            <div className="sb profile__heading-wrapper">
              <h2 className="profile__heading"> Media, Links and Documents </h2>
              <button>
                <Icon id="rightArrow" className="profile__heading-icon" />
              </button>
            </div>
            <div className="profile__media-wrapper">
              {group.data.groupMedia <= 0 ? (
                "No Media Fround"
              ) : (
                <>
                  <img src={media} alt="media" className="profile__media" />
                  <img src={media} alt="media" className="profile__media" />
                  <img src={media} alt="media" className="profile__media" />
                </>
              )}
            </div>
          </div>

          <ul className="profile__section profile__section--actions">
            <li className="profile__action">
              <p className="profile__action-left">
                <span className="profile__action-text profile__action-text--top">
                  Mute Notifications
                </span>
              </p>
              <div className="profile__action-right">
                <Checkbox />
              </div>
            </li>
            <li className="profile__action">
              <p className="profile__action-left">
                <span className="profile__action-text profile__action-text--top">
                  Starred Messages
                </span>
              </p>
              <button className="profile__action-right">
                <Icon id="rightArrow" className="profile__heading-icon" />
              </button>
            </li>
            <li className="profile__action">
              <p className="profile__action-left">
                <span className="profile__action-text profile__action-text--top">
                  Disappearing Messages
                </span>
                <span className="profile__action-text profile__action-text--bottom">
                  Off
                </span>
              </p>
              <button className="profile__action-right">
                <Icon id="rightArrow" className="profile__heading-icon" />{" "}
              </button>
            </li>
            <li className="profile__action">
              <p className="profile__action-left">
                <span className="profile__action-text profile__action-text--top">
                  Group Settings
                </span>
                {/* <span className="profile__action-text profile__action-text--bottom">
                  Off
                </span> */}
              </p>
              <button className="profile__action-right">
                <Icon id="rightArrow" className="profile__heading-icon" />
              </button>
            </li>
          </ul>

          <div className="profile__section profile__section--groups">
            <div className="profile__heading-wrapper">
              <h2 className="sb profile__heading profile__group-heading">
                <span> {group.data.groupUsers.length} Participants</span>
              </h2>
              {group.data.groupUsers.map((e) => (
                <div key={e.id}>
                  {e.id !== getUserDAta()._id ? (
                    <Link to={`/chat/${e.id}`}>
                      <div className="profile__group">
                        <div className="profile__group-avatar-wrapper">
                          <img
                            src={`${REACT_APP_SERVER_URL}api/v1/users/getImage/${e.profileImage}`}
                            alt={e.name}
                            className="avatar"
                          />
                        </div>
                        <div className="profile__group-content">
                          <p className="profile__group-text profile__group-text--top">
                            {e.id === getUserDAta()._id ? "You" : e.name}
                          </p>
                          <p className="profile__group-text profile__group-text--bottom">
                            {e.userAbout}
                          </p>
                        </div>
                        <div className="groupAdmin">
                          {group.data.groupAdmin.includes(e.id) ? (
                            <p className="adminText">Group Admin</p>
                          ) : null}
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="profile__group" key={e.id}>
                      <div className="profile__group-avatar-wrapper">
                        <img
                          src={`${REACT_APP_SERVER_URL}api/v1/users/getImage/${e.profileImage}`}
                          alt={e.name}
                          className="avatar"
                        />
                      </div>
                      <div className="profile__group-content">
                        <p className="profile__group-text profile__group-text--top">
                          {e.id === getUserDAta()._id ? "You" : e.name}
                        </p>
                        <p className="profile__group-text profile__group-text--bottom">
                          {e.userAbout}
                        </p>
                      </div>
                      <div className="groupAdmin">
                        {group.data.groupAdmin.includes(e.id) ? (
                          <p className="adminText">Group Admin</p>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {group.data.groupAdmin.includes(getUserDAta()._id) ? (
            <div
              className="profile__section profile__section--danger"
              onClick={() => {
                dispatch(newGroupList(group.data));
              }}
            >
              <Icon id="block" className="profile__danger-icon" />
              <p className="profile__danger-text participants">
                Add participants
              </p>
            </div>
          ) : null}
          <div className="profile__section profile__section--danger">
            <Icon id="thumbsDown" className="profile__danger-icon" />
            <p className="profile__danger-text"> Report group</p>
          </div>

          <div className="profile__section profile__section--danger">
            <Icon id="block" className="profile__danger-icon" />
            <p className="profile__danger-text"> Exit group </p>
          </div>

          {/* <div className="profile__section profile__section--danger">
            <Icon id="delete" className="profile__danger-icon" />
            <p className="profile__danger-text"> Delete group </p>
          </div> */}
        </div>
      ) : (
        ""
      )}
      <ToastContainer />
    </div>
  );
};

export default GroupDetails;
