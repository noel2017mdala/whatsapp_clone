import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Icon from "components/Icon";
import "./styles/main.css";

const GroupProfile = (props) => {
  let { state, stateMethod } = props.uiState;
  let { users } = props.selectedUsers;
  let [userInput, setUserInput] = useState({
    description: "",
    uploadPhoto: "",
  });

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
          <div className="imageContainer">
            <div className="file-upload">
              <p>Click Here to select your image</p>
              <input
                type="file"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </div>
          </div>

          <input
            className="groupDescription"
            type="text"
            placeholder="group Description"
            onChange={(e) => {
              setUserInput({
                ...userInput,
                description: e.target.value,
              });
            }}
          />
        </div>
        {userInput.description.length > 0 ? (
          <div
            className="group_button"
            onClick={(e) => {
              e.preventDefault();
              let userData = { ...userInput, groupUsers: users };
              console.log(userData);
            }}
          >
            <Icon className="" id="singleTick" />
          </div>
        ) : null}
      </aside>
    </>
  );
};

export default GroupProfile;
