import React from "react";
import { useDispatch } from "react-redux";
import Icon from "components/Icon";
import { Link } from "react-router-dom";
import formatTime from "utils/formatTime";
import Cookie from "universal-cookie";
import { getAllMessages } from "../../Redux/Actions/MessagesAction";
import { setUserChat } from "../../Redux/Actions/MessagesAction";

const GetGroups = (userData) => {
  //   console.log(userData.userData.userGroups);
  return (
    <>
      {userData.userData.userGroups.length < 1 ? (
        <div className="no_chat_notification">No Groups Found</div>
      ) : (
        userData.userData.userGroups.map((e, index) => (
          <Link className="sidebar-contact" to={`/group/${e._id}`} key={index}>
            <div className="sidebar-contact__avatar-wrapper">
              <img
                src={e.groupProfile}
                //   alt={userData.userDetails.profileImage}
                className="avatar"
              />
            </div>
            <div className="sidebar-contact__content">
              <div className="sidebar-contact__top-content">
                <h2 className="sidebar-contact__name">{e.groupName}</h2>
                <span className="sidebar-contact__time">
                  {formatTime("14:54:03")}
                </span>
              </div>
              <div className="sidebar-contact__bottom-content">
                <p className="sidebar-contact__message-wrapper">
                  <Icon
                    id="doubleTick"
                    //   aria-label={userData.userLastMessage?.messageStatus}
                    className={`sidebar-contact__message-icon read`}
                  />
                  <span className="sidebar-contact__message  sidebar-contact__message--unread">
                    {"Group Message"}
                  </span>
                </p>
                <div className="sidebar-contact__icons">
                  <span key={index} className="sidebar-contact__unread">
                    100
                  </span>
                  <button aria-label="sidebar-contact__btn">
                    <Icon
                      id="downArrow"
                      className="sidebar-contact__icon sidebar-contact__icon--dropdown"
                    />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </>
  );
};

export default GetGroups;
