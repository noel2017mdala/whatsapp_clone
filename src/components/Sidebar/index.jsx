import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import "./styles/main.css";
import avatar from "assets/images/profile-picture-girl-1.jpeg";
import Icon from "components/Icon";
import Alert from "./Alert";
import Contact from "./Contact";
import socket from "../../socket";
import GetContact from "./getContacts";
import Cookie from "universal-cookie";
import { fetchContactList } from "../../Redux/Actions/fetchUser";
import OptionsBtn from "components/OptionsButton";
import ListChart from "./ListChat";
import { useUsersContext } from "context/usersContext";

const Sidebar = () => {
  const dispatch = useDispatch();
  let cookie = new Cookie();
  let header = cookie.get("userPayLoad");
  let userData = cookie.get("userData");

  const { users: contacts, Message } = useUsersContext();
  const [uiState, setUiState] = useState(false);

  useEffect(() => {
    dispatch(fetchContactList(userData));
    // dispatch(getLastMessage("61371b75e46bae4721e34ca9"));
  }, [dispatch]);

  // socket.on("receive-message", (message) => {
  //   dispatch(fetchContactList(userData));
  // });

  const select = useSelector((e) => {
    return e;
  });

  // console.log(userData.unreadMessages);

  const override = css`
    display: block;
    margin: 2em auto;
    border-color: #00bfa5;
  `;

  return uiState ? (
    <ListChart
      parentState={{
        state: uiState,
        stateMethod: setUiState,
        userData: userData,
        compState: select,
      }}
    />
  ) : (
    <>
      <aside className="sidebar">
        <header className="header">
          <div className="sidebar__avatar-wrapper">
            <img
              src={userData.profileImage}
              alt={userData.name}
              className="avatar"
            />
          </div>
          <div className="sidebar__actions">
            <button className="sidebar__action" aria-label="Status">
              <Icon
                id="status"
                className="sidebar__action-icon sidebar__action-icon--status"
              />
            </button>
            <button
              className="sidebar__action"
              aria-label="New chat"
              onClick={() => {
                setUiState(true);
              }}
            >
              <Icon id="chat" className="sidebar__action-icon" />
            </button>
            <OptionsBtn
              className="sidebar__action"
              ariaLabel="Menu"
              iconId="menu"
              iconClassName="sidebar__action-icon"
              options={[
                "New group",
                "New user",
                "Create a room",
                "Profile",
                "Archived",
                "Starred",
                "Settings",
                "Log out",
              ]}
            />
          </div>
        </header>
        <Alert />
        <div className="search-wrapper">
          <div className="search-icons">
            <Icon id="search" className="search-icon" />
            <button className="search__back-btn">
              <Icon id="back" />
            </button>
          </div>
          <input className="search" placeholder="Search or start a new chat" />
        </div>

        <div className="sidebar__contacts">
          {!select.fetchContactList ? (
            <ClipLoader color="#00bfa5" css={override} size={30} />
          ) : !select.fetchContactList.data ? (
            <ClipLoader color="#00bfa5" css={override} size={30} />
          ) : !select.fetchContactList.data ? (
            <ClipLoader color="#00bfa5" css={override} size={30} />
          ) : select.fetchContactList.data.message ? (
            <div className="no_chat_notification">No Chats</div>
          ) : (
            select.fetchContactList.data.map((contact, index) => (
              <GetContact
                key={index}
                userData={contact}
                notificationStatus={userData.unreadMessages}
              />
            ))
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
