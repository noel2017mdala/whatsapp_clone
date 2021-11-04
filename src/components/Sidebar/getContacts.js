import React from "react";
import { useDispatch } from "react-redux";
import Icon from "components/Icon";
import { Link } from "react-router-dom";
import formatTime from "utils/formatTime";
import Cookie from "universal-cookie";
import { getAllMessages } from "../../Redux/Actions/MessagesAction";
import { setUserChat } from "../../Redux/Actions/MessagesAction";
const GetContact = ({ userData, notificationStatus }) => {
  let cookie = new Cookie();
  let header = cookie.get("userPayLoad");
  let userInfo = cookie.get("userData");
  const dispatch = useDispatch();

  const dispatchAction = (id) => {
    dispatch(getAllMessages(userInfo, id));
    // dispatch(setUserChat(id, userInfo._id));
  };

  return (
    <>
      {!userData.userDetails ? (
        <div className="no_chat_notification">No Chats</div>
      ) : (
        <Link
          className="sidebar-contact"
          to={`/chat/${userData.userDetails._id}`}
          onClick={() => {
            dispatchAction(userData.userDetails._id);
          }}
        >
          <div className="sidebar-contact__avatar-wrapper">
            <img
              src={
                userData.userDetails.profileImage
                  ? userData.userDetails.profileImage
                  : "http://localhost:8000/public/userProfiles/defaultProfile.jpg"
              }
              alt={userData.userDetails.profileImage}
              className="avatar"
            />
          </div>

          <div className="sidebar-contact__content">
            <div className="sidebar-contact__top-content">
              <h2 className="sidebar-contact__name">
                {userData.userDetails.name}
              </h2>
              <span className="sidebar-contact__time">
                {formatTime(userData.userLastMessage.timeSent)}
              </span>
            </div>

            <div className="sidebar-contact__bottom-content">
              <p className="sidebar-contact__message-wrapper">
                {userData.userLastMessage.messageStatus &&
                  userData.userLastMessage.to === userData.userDetails._id && (
                    <Icon
                      id={
                        userData.userLastMessage?.messageStatus === "sent"
                          ? "singleTick"
                          : "doubleTick"
                      }
                      aria-label={userData.userLastMessage?.messageStatus}
                      className={`sidebar-contact__message-icon ${
                        userData.userLastMessage?.messageStatus === "read"
                          ? "sidebar-contact__message-icon--blue"
                          : ""
                      }`}
                    />
                  )}
                <span
                  className={`sidebar-contact__message ${
                    !!userData.userDetails.unread
                      ? "sidebar-contact__message--unread"
                      : ""
                  }`}
                >
                  {userData.userLastMessage.messagesBody}
                </span>
              </p>

              <div className="sidebar-contact__icons">
                {/* {contact.pinned && (
              <Icon id="pinned" className="sidebar-contact__icon" />
            )} */}
                {/* {!!contact.unread && (
              <span className="sidebar-contact__unread">{contact.unread}</span>
            )} */}
                {userData.userDetails.unreadMessages.map((e, index) =>
                  e.sender === userInfo._id && e.count > 0 ? (
                    <span key={index} className="sidebar-contact__unread">
                      {e.count}
                    </span>
                  ) : null
                )}
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
      )}
    </>
  );
};

export default GetContact;
