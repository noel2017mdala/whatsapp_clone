import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "components/Icon";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import formatTime from "utils/formatTime";
import Cookie from "universal-cookie";
import ClipLoader from "react-spinners/ClipLoader";
import "./styles/main.css";
import { getAllMessages } from "../../Redux/Actions/MessagesAction";
import { setUserChat } from "../../Redux/Actions/MessagesAction";
import { getUserDAta } from "utils/userData";
import {
  getGroupData,
  getGroupMessages,
  getGroupLastMessage,
} from "../../Redux/Actions/groupAction";
import { getUserGroups } from "../../Redux/Actions/groupAction";

const GetGroups = (userData) => {
  const dispatch = useDispatch();
  //   console.log(userData.userData.userGroups);

  const dispatchActions = (id) => {
    dispatch(getGroupData(id));
    dispatch(getGroupMessages(id));
  };

  const select = useSelector((e) => {
    return e;
  });

  useEffect(() => {
    dispatch(getUserGroups(getUserDAta()._id));
  }, []);

  const override = css`
    display: block;
    margin: 2em auto;
    border-color: #00bfa5;
  `;

  let { REACT_APP_SERVER_URL } = process.env;

  return (
    <>
      {!select ? (
        <ClipLoader color="#00bfa5" css={override} size={30} />
      ) : !select.userGroups ? (
        <ClipLoader color="#00bfa5" css={override} size={30} />
      ) : select.userGroups.length < 1 ? (
        <div className="no_chat_notification">No groups found</div>
      ) : (
        select.userGroups.data.map((e, index) => (
          <Link
            className="sidebar-contact"
            to={`/group/${e._id}`}
            key={index}
            onClick={() => {
              dispatchActions(e._id);
            }}
          >
            <div className="sidebar-contact__avatar-wrapper">
              <img
                src={`${REACT_APP_SERVER_URL}api/v1/users/getImage/${e.groupProfile}`}
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
                {/* <p className="sidebar-contact__message-wrapper">
                  {getUserDAta()._id === e.groupLastMessage.from ? (
                    <Icon
                      id="doubleTick"
                      //   aria-label={userData.userLastMessage?.messageStatus}
                      className={`sidebar-contact__message-icon read`}
                    />
                  ) : (
                    ""
                  )}
                  <span className="sidebar-contact__message  sidebar-contact__message--unread">
                    {e.groupLastMessage.messagesBody}
                  </span>
                </p> */}

                <p className="sidebar-contact__message-wrapper">
                  <Icon
                    id="doubleTick"
                    //   aria-label={userData.userLastMessage?.messageStatus}
                    className={`sidebar-contact__message-icon read`}
                  />
                  <span className="sidebar-contact__message  sidebar-contact__message--unread">
                    {!e.groupLastMessage
                      ? e.createdBy === getUserDAta()._id
                        ? `You created the group ${e.groupName}`
                        : `You were added to a group ${e.groupName}`
                      : !e.groupLastMessage
                      ? e.createdBy === getUserDAta()._id
                        ? `You created the group ${e.groupName}`
                        : `You were added to a group ${e.groupName}`
                      : getUserDAta()._id === e.groupLastMessage.from
                      ? `${e.groupLastMessage.messagesBody}`
                      : ""}
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
