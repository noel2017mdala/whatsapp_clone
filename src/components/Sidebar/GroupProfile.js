import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fileUpload } from "../../Redux/Actions/fileUpload";
import Icon from "components/Icon";
import "./styles/main.css";

const GroupProfile = (props) => {
  let { state, stateMethod } = props.uiState;
  let { users } = props.selectedUsers;
  let [userInput, setUserInput] = useState({
    description: "",
    uploadPhoto: "",
  });

  let [description, setDescription] = useState();
  let [file, setFile] = useState();

  const uploadFile = (e) => {
    e.preventDefault();

    const fData = new FormData();
    fData.append("description", description);
    fData.append("file", file);
    // console.log(fData);
    axios
      .post("http://localhost:8000/api/v1/group/createGroup", fData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        // console.log(err.response.data.error);
        console.log(err);
      });
    // fileUpload(fData);
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
              placeholder="group Description"
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
              >
                <Icon className="" id="singleTick" />
              </button>
            ) : null}
          </form>
        </div>
      </aside>
    </>
  );
};

export default GroupProfile;
