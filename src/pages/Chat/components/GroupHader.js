import React from "react";
import Icon from "components/Icon";
import OptionsBtn from "components/OptionsButton";

const GroupHeader = () => {
  return (
    <header className="header chat__header">
      <div className="chat__avatar-wrapper">
        {/* <img src={user.profileImage} alt={user?.name} className="avatar" /> */}
      </div>

      <div className="chat__contact-wrapper">
        <h2 className="chat__contact-name">Group Name</h2>
        <p className="chat__contact-desc">group users</p>
      </div>

      <div className="chat__actions">
        <button
          className="chat__action"
          aria-label="Search"
          //   onClick={openSearchSidebar}
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

export default GroupHeader;
