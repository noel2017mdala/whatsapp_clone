import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import GetContact from "./getContacts";
import Icon from "components/Icon";
import { ToastContainer, toast } from "react-toastify";
import Cookie from "universal-cookie";
import { getAllMessages } from "../../Redux/Actions/MessagesAction";
import { setUserChat } from "../../Redux/Actions/MessagesAction";
import { fetchUserFullContactList } from "Redux/Actions/fetchUser";
import { newGroupList } from "../../Redux/Actions/sideBar";
import { clearGroupList } from "../../Redux/Actions/sideBar";
import { addUserToGroup } from "../../Redux/Actions/sideBar";
import { getUserDAta } from "utils/userData";
import { notifySuccess, notifyError } from "utils/notification";
import { getGroupData } from "Redux/Actions/groupAction";
import "./styles/main.css";

const AddGroupUsers = () => {
  let [checkedUsers, setCheckedUsers] = useState([]);
  let [loader, setLoader] = useState(false);

  let { REACT_APP_SERVER_URL } = process.env;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserFullContactList(getUserDAta()._id));
  }, [dispatch]);

  let select = useSelector((e) => {
    return e;
  });

  const override = css`
    display: block;
    margin: 2em auto;
    border-color: #ffffff;
  `;

  const handleChange = (e) => {
    //checks if the user us checked and also if the usr is already not in the state
    if (e.target.checked & !checkedUsers.includes(e.target.value)) {
      setCheckedUsers([...checkedUsers, e.target.value]);
    } else {
      //   console.log(e.target.value);
      setCheckedUsers([
        ...checkedUsers.filter((value) => {
          return value !== e.target.value;
        }),
      ]);
    }
  };

  const addUser = async (id) => {
    if (id) {
      setLoader(true);
      dispatch(
        addUserToGroup({ checkedUsers, id }, (data) => {
          console.log(data.status);
          if (data.status) {
            setLoader(false);
            notifySuccess(data.message);
            dispatch(getGroupData(id));
            dispatch(clearGroupList());
          } else {
            setLoader(false);
            notifyError(data.message);
            dispatch(clearGroupList());
          }
        })
      );
    }
    //console.log(checkedUsers);
    // dispatch(addUserToGroup(checkedUsers))
  };

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
                dispatch(clearGroupList());
              }}
            />
            <p> Add participants </p>
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
        <div className="sidebar__contacts">
          {!select ? (
            <ClipLoader color="#00bfa5" css={override} size={30} />
          ) : !select.fetchFullContactList.data ? (
            <ClipLoader color="#00bfa5" css={override} size={30} />
          ) : select.fetchFullContactList.data.length === undefined ? (
            <p className="contactsNotFound">No Contact Found</p>
          ) : select.data < 1 ? (
            <p className="contactsNotFound">No Contact Found</p>
          ) : (
            select.fetchFullContactList.data.map((e, index) => (
              <div key={index}>
                <label>
                  <div
                    className="sidebar-contact"

                    // onClick={() => {
                    //   //   dispatchAction(e._id);
                    //   stateMethod({
                    //     ...state,
                    //     uiState: !state.uiState,
                    //   });
                    // }}
                  >
                    <div className="sidebar-contact__avatar-wrapper">
                      <img
                        src={
                          e.profileImage
                            ? `${REACT_APP_SERVER_URL}api/v1/users/getImage/${e.profileImage}`
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
                          {select.sideBarReducer.data.resData.includes(
                            e._id.toString()
                          )
                            ? "Already added to the group"
                            : e.userAbout}
                        </p>
                      </div>
                    </div>
                    {/* Shows when the user is not added to the group */}
                    {select.sideBarReducer.data.resData.includes(
                      e._id.toString()
                    ) ? (
                      ""
                    ) : (
                      <input
                        type="checkbox"
                        className="checkBox"
                        onChange={handleChange}
                        value={e._id}
                        checked={checkedUsers.includes(e._id) ? "checked" : ""}
                      />
                    )}
                  </div>
                </label>
              </div>
            ))
          )}
        </div>
        {checkedUsers.length > 0 ? (
          <button
            className="group_button"
            disabled={loader}
            type="submit"
            onClick={() => {
              addUser(select.sideBarReducer.data.groupId);
            }}
          >
            {loader ? (
              <ClipLoader color="#00bfa5" css={override} size={20} />
            ) : (
              <Icon className="" id="singleTick" />
            )}
          </button>
        ) : (
          ""
        )}
        <ToastContainer />
      </aside>
    </>
  );
};

export default AddGroupUsers;
