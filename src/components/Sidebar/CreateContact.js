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
import { fetchUserFullContactList, createUser } from "Redux/Actions/fetchUser";
import "./styles/main.css";

const CreateContacts = (props) => {
  let { state, stateMethod, userData } = props.parentState;

  let dispatch = useDispatch();

  let [userContact, setUserContact] = useState({
    contact: "",
    name: "",
  });

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
                  newUserState: !state.newUserState,
                });
              }}
            />
            <p>Add Contact</p>
          </div>
        </header>
        <div className="search-wrapper">
          {/* <div className="search-icons">
            <Icon id="search" className="search-icon" />
            <button className="search__back-btn">
              <Icon id="back" />
            </button>
          </div>
          <input className="search" placeholder="Search contacts" /> */}
        </div>
        {/*Group tag to be added here*/}
        <div className="sidebar__contacts">
          <div className="form_controller">
            <form>
              <label>
                Contact Name
                <input
                  type="text"
                  name="username"
                  placeholder="contact name"
                  onChange={(e) => {
                    setUserContact({
                      ...userContact,
                      name: e.target.value,
                    });
                  }}
                />
              </label>
              <label>
                Contact Number
                <input
                  type="number"
                  name="user number"
                  placeholder="phone number"
                  onChange={(e) => {
                    setUserContact({
                      ...userContact,
                      contact: e.target.value,
                    });
                  }}
                />
              </label>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log(userContact);
                  dispatch(createUser(userData._id, userContact));
                }}
              >
                Add contact
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
};

export default CreateContacts;
