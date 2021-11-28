import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserFullContactList } from "Redux/Actions/fetchUser";
import GroupProfile from "./GroupProfile";
import ClipLoader from "react-spinners/ClipLoader";
import Icon from "components/Icon";
import { css } from "@emotion/react";
import "./styles/main.css";
import {
  getNewChart,
  createGroupState,
  createNewUserState,
  getUserProfile,
} from "../../Redux/Actions/sideBar";

let { REACT_APP_SERVER_URL } = process.env;

const CreateGroup = (props) => {
  let { state, stateMethod, userData } = props.parentState;
  let [checkedUsers, setCheckedUsers] = useState([]);
  let [uiState, setUiState] = useState({
    groupProfile: false,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserFullContactList(userData._id));
  }, [dispatch]);

  let select = useSelector((e) => {
    return e.fetchFullContactList;
  });

  const override = css`
    display: block;
    margin: 2em auto;
    border-color: #00bfa5;
  `;

  const handleChange = (e) => {
    if (e.target.checked & !checkedUsers.includes(e.target.value)) {
      setCheckedUsers([...checkedUsers, e.target.value]);
    } else {
      //   console.log(e.target.value);
      setCheckedUsers([
        ...checkedUsers.filter((value) => {
          return value !== e.target.value;
        }),
      ]);
    }
  };

  return !uiState.groupProfile ? (
    <>
      <aside className="sidebar  header_sidebar_container">
        <header className="header_sidebar">
          <div className="header_sidebar_content">
            <Icon
              className="back_pointer"
              id="back"
              onClick={() => {
                dispatch(createGroupState());
              }}
            />
            <p>Add group participants</p>
          </div>
        </header>
        <div className="search-wrapper">
          <div className="search-icons">
            <Icon id="search" className="search-icon" />
            <button className="search__back-btn">
              <Icon id="back" />
            </button>
          </div>
          <input className="search" placeholder="Search contacts" />
        </div>
        <div className="sidebar__contacts">
          {!select ? (
            <ClipLoader color="#00bfa5" css={override} size={30} />
          ) : !select.data ? (
            <ClipLoader color="#00bfa5" css={override} size={30} />
          ) : select.data.length === undefined ? (
            <p className="contactsNotFound">No Contact Found</p>
          ) : select.data < 1 ? (
            <p className="contactsNotFound">No Contact Found</p>
          ) : (
            select.data.map((e, index) => (
              <div key={index}>
                <label>
                  <div
                    className="sidebar-contact"

                    // onClick={() => {
                    //   //   dispatchAction(e._id);
                    //   stateMethod({
                    //     ...state,
                    //     uiState: !state.uiState,
                    //   });
                    // }}
                  >
                    <div className="sidebar-contact__avatar-wrapper">
                      <img
                        src={
                          e.profileImage
                            ? e.profileImage
                            : `${REACT_APP_SERVER_URL}public/userProfiles/defaultProfile.jpg`
                        }
                        alt={e.profileImage}
                        className="avatar"
                      />
                    </div>

                    <div className="sidebar-contact__content">
                      <div className="sidebar-contact__top-content">
                        <h2 className="sidebar-contact__name">{e.name}</h2>
                        {/* <span className="sidebar-contact__time">
             {formatTime(userData.userLastMessage.timeSent)}
           </span> */}
                      </div>

                      <div className="sidebar-contact__bottom-content">
                        <p className="sidebar-contact__message-wrapper">
                          This is for user status
                        </p>
                      </div>
                    </div>

                    <input
                      type="checkbox"
                      className="checkBox"
                      onChange={handleChange}
                      value={e._id}
                      checked={checkedUsers.includes(e._id) ? "checked" : ""}
                    />
                  </div>
                </label>
              </div>
            ))
          )}
        </div>
        {checkedUsers.length > 0 ? (
          <div
            className="group_button"
            onClick={() => {
              setUiState({
                ...uiState,
                groupProfile: !uiState.groupProfile,
              });
            }}
          >
            <Icon className="back_pointer" id="back" />
          </div>
        ) : null}
      </aside>
    </>
  ) : (
    <GroupProfile
      uiState={{
        state: uiState,
        stateMethod: setUiState,
      }}
      selectedUsers={{
        users: checkedUsers,
      }}
      mainState={{
        mainState: state,
        mainStateMethod: stateMethod,
      }}
    />
  );
};

export default CreateGroup;
