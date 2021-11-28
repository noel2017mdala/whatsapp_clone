import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Icon from "components/Icon";
import { getUserDAta, userLogout } from "utils/userData";
import axios from "axios";
import { generateToken } from "utils/generateToken";
import {
  createGroupState,
  createNewUserState,
  getUserProfile,
} from "../../Redux/Actions/sideBar";

import "./styles/main.css";

let { REACT_APP_SERVER_URL } = process.env;
const OptionsBtn = ({
  className,
  iconId,
  iconClassName,
  ariaLabel,
  options = [],
  position = "left",
  showPressed = true,
  parentState,
  ...props
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const logUserOut = () => {
    let url = `${REACT_APP_SERVER_URL}api/v1/users/logout/${getUserDAta()._id}`;
    axios
      .get(url, {
        method: "GET",
        responseType: "stream",
        headers: {
          "access-token": generateToken(),
          "user-id": getUserDAta()._id,
        },
      })
      .then((res) => {
        if (res.data._id) {
          let checkLogout = userLogout();
          if (checkLogout) {
            window.location.reload();
          }
        }
      });
  };

  const dispatch = useDispatch();
  const select = useSelector((e) => {
    return e;
  });

  return (
    <div className="pos-rel">
      <button
        aria-label={ariaLabel}
        className={`options-btn ${
          showOptions && showPressed ? "options-btn--pressed" : ""
        } ${className || ""}`}
        onClick={() => setShowOptions(!showOptions)}
        {...props}
      >
        <Icon id={iconId} className={iconClassName} />
      </button>
      <ul
        className={`options-btn__options ${
          showOptions ? "options-btn__options--active" : ""
        } ${position === "right" ? "options-btn__options--right" : ""}`}
      >
        {options.map((option, index) => (
          <li
            className="options-btn__option"
            key={index}
            value={option}
            onClick={(e) => {
              if (e.target.textContent === "New user") {
                // console.log(parentState.stateMethod);
                // parentState.stateMethod({
                //   ...parentState.state,
                //   uiState: false,
                //   newUserState: true,
                //   groupUi: false,
                // });
                dispatch(createNewUserState());
              } else if (e.target.textContent === "New group") {
                // parentState.stateMethod({
                //   ...parentState.state,
                //   uiState: false,
                //   newUserState: false,
                //   groupUi: true,
                // });
                dispatch(createGroupState());
              } else if (e.target.textContent === "Profile") {
                // parentState.stateMethod({
                //   ...parentState.state,
                //   uiState: false,
                //   newUserState: false,
                //   groupUi: false,
                //   profileUi: true,
                // });
                dispatch(getUserProfile());
              } else if (e.target.textContent === "Log out") {
                logUserOut();
              }
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OptionsBtn;
