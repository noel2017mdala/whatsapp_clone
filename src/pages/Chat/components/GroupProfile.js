import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import groupAvatar from "assets/images/women.png";
import media from "assets/images/placeholder.jpeg";
import Checkbox from "components/Checkbox";
import Icon from "components/Icon";
import { getUserDAta } from "utils/userData";
import { newGroupList } from "Redux/Actions/sideBar";

const GroupDetails = (props) => {
  const { group, openProfileSidebar, openSearchSidebar } = props;
  const dispatch = useDispatch();

  const select = useSelector((e) => {
    return e;
  });

  return (
    <div className="profile">
      {group.data ? (
        <div className="profile">
          <div className="profile__section profile__section--personal">
            <div className="profile__avatar-wrapper">
              <img
                src={group.data.groupProfile}
                alt={group.data.groupName}
                className="avatar"
              />
            </div>
            <h2 className="profile__name"> {group.data.groupName} </h2>
          </div>

          <div className="profile__section profile__section--media">
            <div className="sb profile__heading-wrapper">
              <h2 className="profile__heading"> Media, Links and Documents </h2>
              <button>
                <Icon id="rightArrow" className="profile__heading-icon" />
              </button>
            </div>
            <div className="profile__media-wrapper">
              {group.data.groupMedia <= 0 ? (
                "No Media Fround"
              ) : (
                <>
                  <img src={media} alt="media" className="profile__media" />
                  <img src={media} alt="media" className="profile__media" />
                  <img src={media} alt="media" className="profile__media" />
                </>
              )}
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
            <li className="profile__action">
              <p className="profile__action-left">
                <span className="profile__action-text profile__action-text--top">
                  Group Settings
                </span>
                {/* <span className="profile__action-text profile__action-text--bottom">
                  Off
                </span> */}
              </p>
              <button className="profile__action-right">
                <Icon id="rightArrow" className="profile__heading-icon" />
              </button>
            </li>
          </ul>

          <div className="profile__section profile__section--groups">
            <div className="profile__heading-wrapper">
              <h2 className="sb profile__heading profile__group-heading">
                <span> {group.data.groupUsers.length} Participants</span>
              </h2>
              {group.data.groupUsers.map((e) => (
                <div key={e.id}>
                  {e.id !== getUserDAta()._id ? (
                    <Link to={`/chat/${e.id}`}>
                      <div className="profile__group">
                        <div className="profile__group-avatar-wrapper">
                          <img
                            src={e.profileImage}
                            alt={e.name}
                            className="avatar"
                          />
                        </div>
                        <div className="profile__group-content">
                          <p className="profile__group-text profile__group-text--top">
                            {e.id === getUserDAta()._id ? "You" : e.name}
                          </p>
                          <p className="profile__group-text profile__group-text--bottom">
                            {e.userAbout}
                          </p>
                        </div>
                        <div className="groupAdmin">
                          {group.data.groupAdmin.includes(e.id) ? (
                            <p className="adminText">Group Admin</p>
                          ) : null}
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="profile__group" key={e.id}>
                      <div className="profile__group-avatar-wrapper">
                        <img
                          src={e.profileImage}
                          alt={e.name}
                          className="avatar"
                        />
                      </div>
                      <div className="profile__group-content">
                        <p className="profile__group-text profile__group-text--top">
                          {e.id === getUserDAta()._id ? "You" : e.name}
                        </p>
                        <p className="profile__group-text profile__group-text--bottom">
                          {e.userAbout}
                        </p>
                      </div>
                      <div className="groupAdmin">
                        {group.data.groupAdmin.includes(e.id) ? (
                          <p className="adminText">Group Admin</p>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {group.data.groupAdmin.includes(getUserDAta()._id) ? (
            <div
              className="profile__section profile__section--danger"
              onClick={() => {
                dispatch(newGroupList(group.data));
              }}
            >
              <Icon id="block" className="profile__danger-icon" />
              <p className="profile__danger-text participants">
                Add participants
              </p>
            </div>
          ) : null}
          <div className="profile__section profile__section--danger">
            <Icon id="thumbsDown" className="profile__danger-icon" />
            <p className="profile__danger-text"> Report group</p>
          </div>

          <div className="profile__section profile__section--danger">
            <Icon id="block" className="profile__danger-icon" />
            <p className="profile__danger-text"> Exit group </p>
          </div>

          {/* <div className="profile__section profile__section--danger">
            <Icon id="delete" className="profile__danger-icon" />
            <p className="profile__danger-text"> Delete group </p>
          </div> */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default GroupDetails;
