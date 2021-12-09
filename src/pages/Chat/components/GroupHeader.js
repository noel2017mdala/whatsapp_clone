import React from "react";
import Icon from "components/Icon";
import OptionsBtn from "components/OptionsButton";
import { getUserDAta } from "utils/userData";

const GroupHeader = (props) => {
  const { userDetails, openProfileSidebar, openSearchSidebar } = props;
  let { REACT_APP_SERVER_URL } = process.env;
  return (
    <header className="header chat__header">
      {!userDetails.data ? (
        ""
      ) : (
        <>
          <div className="chat__avatar-wrapper" onClick={openProfileSidebar}>
            <img
              src={`${REACT_APP_SERVER_URL}api/v1/users/getImage/${userDetails.data.groupProfile}`}
              alt={userDetails.data.groupName}
              className="avatar"
            />
          </div>

          <div className="chat__contact-wrapper" onClick={openProfileSidebar}>
            <h2 className="chat__contact-name">{userDetails.data.groupName}</h2>
            <p className="chat__contact-desc">
              {userDetails.data.groupUsers.map((user, index) => {
                return `${user._id !== getUserDAta()._id ? user.name : "You"} ${
                  userDetails.data.groupUsers.length - 2 >= index ? "," : ""
                } `;
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
        </>
      )}
    </header>
  );
};

export default GroupHeader;
