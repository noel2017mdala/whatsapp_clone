import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getLastMessage,
  getAllMessages,
} from "../../Redux/Actions/MessagesAction";
import Cookie from "universal-cookie";
import Icon from "components/Icon";
import { Link } from "react-router-dom";
import formatTime from "utils/formatTime";
const RenderContacts = ({ contact }) => {
  let cookie = new Cookie();
  let header = cookie.get("userPayLoad");
  let userData = cookie.get("userData");
  let { REACT_APP_SERVER_URL } = process.env;
  const dispatch = useDispatch();
  useEffect(() => {
    if (contact) {
      dispatch(getLastMessage(userData, contact.id));
    }
  }, [dispatch]);
  const select = useSelector((e) => {
    return e.MessageReducer;
  });

  // const getLastMessage = (user_id) => {
  //   let collectData = [];
  //   if (select.data) {
  //     select.data.map((e) => {
  //       if (user_id === e.to) {
  //         collectData.push(e);
  //       }
  //     });
  //   }
  // };

  const dispatchAction = () => {
    // console.log("Action Dispatched successfully");
  };

  return (
    <div>
      <Link
        className="sidebar-contact"
        to={`/chat/${contact.id}`}
        onClick={dispatchAction}
        // onClick={() => setUserAsUnread(contact.id)}
      >
        <div className="sidebar-contact__avatar-wrapper">
          <img
            src={
              contact.profileImage
                ? contact.profileImage
                : `${REACT_APP_SERVER_URL}public/userProfiles/defaultProfile.jpg`
            }
            alt={contact.profileImage}
            className="avatar"
          />
        </div>

        <div className="sidebar-contact__content">
          <div className="sidebar-contact__top-content">
            <h2 className="sidebar-contact__name"> {contact.name} </h2>
            <span className="sidebar-contact__time">
              {formatTime(
                contact.UserLastMessage.map((e) => {
                  return e.timeSent;
                })
              )}
            </span>
          </div>

          <div className="sidebar-contact__bottom-content">
            <p className="sidebar-contact__message-wrapper">
              {contact.UserLastMessage.map((e) => (
                <Icon
                  id={e?.messageStatus === "sent" ? "singleTick" : "doubleTick"}
                  aria-label={e?.messageStatus}
                  className={`sidebar-contact__message-icon ${
                    e?.messageStatus === "read"
                      ? "sidebar-contact__message-icon--blue"
                      : ""
                  }`}
                />
              ))}
              <span
                className={`sidebar-contact__message ${
                  !!contact.unread ? "sidebar-contact__message--unread" : ""
                }`}
              >
                {contact.UserLastMessage.map((e) => {
                  return e.messagesBody;
                })}
              </span>
            </p>

            <div className="sidebar-contact__icons">
              {/* {contact.pinned && (
        <Icon id="pinned" className="sidebar-contact__icon" />
      )}
      {!!contact.unread && (
        <span className="sidebar-contact__unread">{contact.unread}</span>
      )} */}
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
    </div>
  );
};

export default RenderContacts;
