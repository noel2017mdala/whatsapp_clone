import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Icon from "components/Icon";

const UserProfile = (props) => {
  let { state, stateMethod, userData } = props.parentState;
  // console.log(userData);
  return (
    <>
      <aside className="sidebar  header_sidebar_container">
        <header className="header_sidebar">
          <div className="header_sidebar_content">
            <Icon
              className="back_pointer"
              id="back"
              onClick={() => {
                stateMethod({
                  ...state,
                  profileUi: !state.profileUi,
                });
              }}
            />
            <p>Profile</p>
          </div>
        </header>
        <div className="sidebar__contacts">
          <div className="profile__section profile__section--personal">
            <div className="profile__avatar-wrapper">
              <img
                src={userData.profileImage}
                alt={userData.name}
                className="avatar"
              />
            </div>

            <h2 className="profile__name"> {userData.name}</h2>
          </div>
          <p className="user_info_data">
            This is not your username or pin. This name will be visible to your
            WhatsApp contacts.
          </p>
          <div className="user_info">
            <p className="user_name">About</p>
            <div className="user_about">A man on a mission so help me God</div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default UserProfile;
