import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles/main.css";
import avatar from "assets/images/profile-picture-girl-1.jpeg";
import Icon from "components/Icon";
import Alert from "./Alert";
import Contact from "./Contact";
import GetContact from "./getContacts";
import Cookie from "universal-cookie";
import { fetchContactList } from "../../Redux/Actions/fetchUser";
import OptionsBtn from "components/OptionsButton";
import { useUsersContext } from "context/usersContext";

const Sidebar = () => {
  const dispatch = useDispatch();
  let cookie = new Cookie();
  let header = cookie.get("userPayLoad");
  let userData = cookie.get("userData");

  const { users: contacts, Message } = useUsersContext();

  useEffect(() => {
    dispatch(fetchContactList(userData));
    // dispatch(getLastMessage("61371b75e46bae4721e34ca9"));
  }, [dispatch]);

  const select = useSelector((e) => {
    return e;
  });
  return (
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
          <button className="sidebar__action" aria-label="New chat">
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
        {!select.fetchContactList
          ? null
          : !select.fetchContactList.data
          ? null
          : !select.fetchContactList.data
          ? null
          : select.fetchContactList.data.map((contact, index) => (
              <GetContact key={index} userData={contact} />
            ))}
      </div>
    </aside>
  );
};

export default Sidebar;
