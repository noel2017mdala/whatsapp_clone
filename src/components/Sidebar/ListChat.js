import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import GetContact from "./getContacts";
import Icon from "components/Icon";
import Cookie from "universal-cookie";
import { getAllMessages } from "../../Redux/Actions/MessagesAction";
import { setUserChat } from "../../Redux/Actions/MessagesAction";
import { fetchUserFullContactList } from "Redux/Actions/fetchUser";
import { getNewChart } from "../../Redux/Actions/sideBar";
import "./styles/main.css";

const ListChart = (props) => {
  let { REACT_APP_SERVER_URL } = process.env;
  let cookie = new Cookie();
  let userInfo = cookie.get("userData");
  const dispatch = useDispatch();
  //   console.log(props.parentState);
  const { state, stateMethod, userData, compState } = props.parentState;

  useEffect(() => {
    dispatch(fetchUserFullContactList(userInfo._id));
  }, [dispatch]);

  let select = useSelector((e) => {
    return e.fetchFullContactList;
  });

  const dispatchAction = (id) => {
    dispatch(getAllMessages(userInfo, id));
    dispatch(setUserChat(id, userInfo._id));
  };
  const override = css`
    display: block;
    margin: 2em auto;
    border-color: #00bfa5;
  `;

  return (
    <>
      <aside className="sidebar  header_sidebar_container">
        <header className="header_sidebar">
          <div className="header_sidebar_content">
            <Icon
              className="back_pointer"
              id="back"
              onClick={() => {
                // setCreateUserState(!state);

                dispatch(getNewChart());
              }}
            />
            <p>New Chat</p>
          </div>
        </header>
        <div className="search-wrapper">
          <div className="search-icons">
            <Icon id="search" className="search-icon" />
            <button className="search__back-btn">
              <Icon id="back" />
            </button>
          </div>
          <input className="search" placeholder="Search contacts" />
        </div>
        {/*Group tag to be added here*/}
        <div className="sidebar__contacts">
          {!select ? (
            <ClipLoader color="#00bfa5" css={override} size={30} />
          ) : !select.data ? (
            <ClipLoader color="#00bfa5" css={override} size={30} />
          ) : select.data.length === undefined ? (
            <p className="contactsNotFound">No Contact Found</p>
          ) : select.data < 1 ? (
            <p className="contactsNotFound">No Contact Found</p>
          ) : (
            select.data.map((e, index) => (
              <Link
                key={index}
                className="sidebar-contact"
                to={`/chat/${e._id}`}
                onClick={() => {
                  dispatchAction(e._id);
                  dispatch(getNewChart());
                }}
              >
                <div className="sidebar-contact__avatar-wrapper">
                  <img
                    src={
                      e.profileImage
                        ? e.profileImage
                        : `${REACT_APP_SERVER_URL}public/userProfiles/defaultProfile.jpg`
                    }
                    alt={e.profileImage}
                    className="avatar"
                  />
                </div>

                <div className="sidebar-contact__content">
                  <div className="sidebar-contact__top-content">
                    <h2 className="sidebar-contact__name">{e.name}</h2>
                    {/* <span className="sidebar-contact__time">
                {formatTime(userData.userLastMessage.timeSent)}
              </span> */}
                  </div>

                  <div className="sidebar-contact__bottom-content">
                    <p className="sidebar-contact__message-wrapper">
                      {e.userAbout}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </aside>
    </>
  );
};

export default ListChart;
