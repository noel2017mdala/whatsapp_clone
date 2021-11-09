import React from "react";
import Icon from "components/Icon";
import OptionsBtn from "components/OptionsButton";

const GroupHeader = (props) => {
  const { userDetails, openProfileSidebar, openSearchSidebar } = props;

  return (
    <header className="header chat__header">
      {!userDetails.data ? (
        ""
      ) : (
        <>
          <div className="chat__avatar-wrapper" onClick={openProfileSidebar}>
            <img
              src={userDetails.data.groupProfile}
              alt={userDetails.data.groupName}
              className="avatar"
            />
          </div>

          <div className="chat__contact-wrapper" onClick={openProfileSidebar}>
            <h2 className="chat__contact-name">{userDetails.data.groupName}</h2>
            <p className="chat__contact-desc">
              {userDetails.data.groupUsers.map((user, index) => {
                return `${user.name} ${
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
