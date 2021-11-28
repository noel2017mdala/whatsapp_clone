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
import { newGroupList } from "../../Redux/Actions/sideBar";
import "./styles/main.css";

const AddGroupUsers = () => {
  const dispatch = useDispatch();
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
                dispatch(newGroupList());
              }}
            />
            <p>Add user</p>
          </div>
        </header>
      </aside>
    </>
  );
};

export default AddGroupUsers;
