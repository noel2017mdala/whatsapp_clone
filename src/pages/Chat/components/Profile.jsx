import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserDAta } from "utils/userData";
import { getCommonGroups } from "Redux/Actions/groupAction";
import groupAvatar from "assets/images/women.png";
import media from "assets/images/placeholder.jpeg";
import Checkbox from "components/Checkbox";
import Icon from "components/Icon";

const Profile = ({ user, history }) => {
  const dispatch = useDispatch();

  const select = useSelector((e) => {
    return e;
  });

  useEffect(() => {
    dispatch(
      getCommonGroups({
        senderId: user.id,
        id: getUserDAta()._id,
      })
    );
  }, []);
  let { REACT_APP_SERVER_URL } = process.env;
  return (
    <div className="profile">
      <div className="profile__section profile__section--personal">
        <div className="profile__avatar-wrapper">
          <img
            src={`${REACT_APP_SERVER_URL}api/v1/users/getImage/${user.profileImage}`}
            alt={user.name}
            className="avatar"
          />
        </div>
        <h2 className="profile__name"> {user.name} </h2>
      </div>

      <div className="profile__section profile__section--media">
        <div className="sb profile__heading-wrapper">
          <h2 className="profile__heading"> Media, Links and Documents </h2>
          <button>
            <Icon id="rightArrow" className="profile__heading-icon" />
          </button>
        </div>
        <div className="profile__media-wrapper">
          <img src={media} alt="media" className="profile__media" />
          <img src={media} alt="media" className="profile__media" />
          <img src={media} alt="media" className="profile__media" />
        </div>
      </div>

      <ul className="profile__section profile__section--actions">
        <li className="profile__action">
          <p className="profile__action-left">
            <span className="profile__action-text profile__action-text--top">
              Mute Notifications
            </span>
          </p>
          <div className="profile__action-right">
            <Checkbox />
          </div>
        </li>
        <li className="profile__action">
          <p className="profile__action-left">
            <span className="profile__action-text profile__action-text--top">
              Starred Messages
            </span>
          </p>
          <button className="profile__action-right">
            <Icon id="rightArrow" className="profile__heading-icon" />
          </button>
        </li>
        <li className="profile__action">
          <p className="profile__action-left">
            <span className="profile__action-text profile__action-text--top">
              Disappearing Messages
            </span>
            <span className="profile__action-text profile__action-text--bottom">
              Off
            </span>
          </p>
          <button className="profile__action-right">
            <Icon id="rightArrow" className="profile__heading-icon" />{" "}
          </button>
        </li>
      </ul>

      <div className="profile__section profile__section--about">
        <div className="sb profile__heading-wrapper">
          <h2 className="profile__heading"> About and phone number </h2>
        </div>
        <ul>
          <li className="profile__about-item">{user.userAbout}</li>
          <li className="profile__about-item">{`+265 0${user.phoneNumber}`}</li>
        </ul>
      </div>

      <div className="profile__section profile__section--groups">
        <div className="profile__heading-wrapper">
          <h2 className="sb profile__heading profile__group-heading">
            <span> Groups in common </span>
            <span>
              {!select
                ? ""
                : !select.commonGroups
                ? ""
                : !select.commonGroups.data
                ? ""
                : select.commonGroups.data.length}
            </span>
          </h2>
        </div>

        {!select ? (
          ""
        ) : !select.commonGroups ? (
          ""
        ) : !select.commonGroups.data ? (
          ""
        ) : select.commonGroups.data === undefined ? (
          <p className="profile__about-item">No groups Found</p>
        ) : select.commonGroups.data < 1 ? (
          <p className="common_group">No groups Found</p>
        ) : (
          select.commonGroups.data.map((e, index) =>
            e ? (
              <Link to={`/group/${e._id}`} key={index}>
                <div className="profile__group" key={index}>
                  <div className="profile__group-avatar-wrapper">
                    <img
                      src={`${REACT_APP_SERVER_URL}api/v1/users/getImage/${e.groupProfile}`}
                      alt="Group 3"
                      className="avatar"
                    />
                  </div>
                  <div className="profile__group-content">
                    <p className="profile__group-text profile__group-text--top">
                      {e.groupName}
                    </p>
                    <p className="profile__group-text profile__group-text--bottom">
                      {e.groupUsers.map((user, index) => {
                        return `${user.name} ${
                          select.commonGroups.data.length - 2 >= index
                            ? ","
                            : ""
                        } `;
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            ) : null
          )
        )}
      </div>

      <div className="profile__section profile__section--danger">
        <Icon id="block" className="profile__danger-icon" />
        <p className="profile__danger-text"> Block </p>
      </div>

      <div className="profile__section profile__section--danger">
        <Icon id="thumbsDown" className="profile__danger-icon" />
        <p className="profile__danger-text"> Report contact </p>
      </div>

      <div className="profile__section profile__section--danger">
        <Icon id="delete" className="profile__danger-icon" />
        <p className="profile__danger-text"> Delete chat </p>
      </div>
    </div>
  );
};

export default Profile;
