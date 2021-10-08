import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Icon from "components/Icon";
import OptionsBtn from "components/OptionsButton";
import socket from "../../../socket";

import Cookie from "universal-cookie";

// let cookie = new Cookie();
// let userData = cookie.get("userData");

// socket.on("connect", () => {
//   socket.emit("getUserActivity", {
//     userId: userData._id,
//     socketId: socket.id,
//   });

//   socket.on("userLastSeenData", (data) => {
//     console.log(data);
//   });
// });

const Header = ({ user, openProfileSidebar, openSearchSidebar }) => {
  // console.log(user);
  const { id } = useParams();
  return (
    <header className="header chat__header">
      <div className="chat__avatar-wrapper" onClick={openProfileSidebar}>
        <img src={user.profileImage} alt={user?.name} className="avatar" />
      </div>

      <div className="chat__contact-wrapper" onClick={openProfileSidebar}>
        <h2 className="chat__contact-name"> {user?.name}</h2>
        <p className="chat__contact-desc">
          {user.userActivity.map((e) => {
            return e.socketId ? "online" : `last seen ${e.lastSeenTime}`;
          })}
        </p>
      </div>
      <div className="chat__actions">
        <button
          className="chat__action"
          aria-label="Search"
          onClick={openSearchSidebar}
        >
          <Icon
            id="search"
            className="chat__action-icon chat__action-icon--search"
          />
        </button>
        <OptionsBtn
          className="chat__action"
          ariaLabel="Menu"
          iconId="menu"
          iconClassName="chat__action-icon"
          options={[
            "Contact Info",
            "Select Messages",
            "Mute notifications",
            "Clear messages",
            "Delete chat",
          ]}
        />
      </div>
    </header>
  );
};

export default Header;
