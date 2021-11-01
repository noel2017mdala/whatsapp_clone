import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import uuid from "react-uuid";
import { css } from "@emotion/react";
import { getUserDAta } from "utils/userData";
import ClipLoader from "react-spinners/ClipLoader";
import Icon from "components/Icon";
import "./styles/main.css";

const GroupProfile = (props) => {
  let { state, stateMethod } = props.uiState;
  let { users } = props.selectedUsers;
  let [description, setDescription] = useState();
  let [file, setFile] = useState();
  let [disAbleButton, setDisableButton] = useState(false);

  const uploadFile = (e) => {
    e.preventDefault();
    setDisableButton(true);

    const fData = new FormData();
    fData.append("description", description);
    fData.append("Uid", uuid());
    fData.append("users", users);
    fData.append("created_by", getUserDAta()._id);
    fData.append("file", file);
    // console.log(fData);
    axios
      .post("http://localhost:8000/api/v1/group/createGroup", fData)
      .then((res) => {
        if (res.data) {
          console.log("done");
          setDisableButton(false);
          stateMethod({
            ...state,
            groupProfile: !state.groupProfile,
          });
        }
      })
      .catch((err) => {
        // console.log(err.response.data.error);
        console.log(err);
      });
    // fileUpload(fData);
  };

  const override = css`
    display: block;
    margin: 2em auto;
    border-color: #ffffff;
  `;

  return (
    <>
      <aside className="sidebar  header_sidebar_container">
        <header className="header_sidebar">
          <div className="header_sidebar_content">
            <Icon
              className="back_pointer"
              id="back"
              onClick={() => {
                stateMethod({
                  ...state,
                  groupProfile: !state.groupProfile,
                });
              }}
            />
            <p>New group</p>
          </div>
        </header>
        <div className="sidebar__contacts">
          <form action="#">
            <div className="imageContainer">
              <div className="file-upload">
                <p>Click Here to select your image</p>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFile(file);
                  }}
                  id="file"
                />
              </div>
            </div>

            <input
              className="groupDescription"
              type="text"
              placeholder="Group Name"
              onChange={(e) => {
                const { value } = e.target;
                setDescription(value);
              }}
              id="name"
            />
            {!description ? null : description.length > 0 ? (
              <button
                className="group_button group_button_create"
                onClick={uploadFile}
                disabled={disAbleButton}
              >
                {disAbleButton ? (
                  <ClipLoader color="#00bfa5" css={override} size={20} />
                ) : (
                  <Icon className="" id="singleTick" />
                )}
              </button>
            ) : null}
          </form>
        </div>
      </aside>
    </>
  );
};

export default GroupProfile;
