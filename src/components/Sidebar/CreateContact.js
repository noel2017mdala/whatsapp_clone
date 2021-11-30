import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import GetContact from "./getContacts";
import Icon from "components/Icon";
import Cookie from "universal-cookie";
import { getAllMessages } from "../../Redux/Actions/MessagesAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUserChat } from "../../Redux/Actions/MessagesAction";
import { fetchUserFullContactList, createUser } from "Redux/Actions/fetchUser";
import "./styles/main.css";
import { createNewUserState } from "../../Redux/Actions/sideBar";

const CreateContacts = (props) => {
  let { state, stateMethod, userData } = props.parentState;

  let dispatch = useDispatch();
  const regEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  let [userContact, setUserContact] = useState({
    contact: "",
    name: "",
  });

  let [disAbleButton, setDisableButton] = useState(false);

  const notifySuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notifyError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const createContact = async (id, userContact) => {
    setDisableButton(true);
    if (!regEx.test(userContact.contact)) {
      notifyError("Please enter a valid phone number");
      setDisableButton(false);
    } else {
      const createUserData = await createUser(id, userContact);

      if (createUserData) {
        if (createUserData.status) {
          notifySuccess(createUserData.message);
          setDisableButton(false);
        } else {
          notifyError(createUserData.message);
          setDisableButton(false);
        }
      } else {
        notifyError(createUserData.message);
        setDisableButton(false);
      }
    }
  };

  const override = css`
    // display: block;
    // margin: 2em auto;
    border-color: #ffffff;
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
                // stateMethod({
                //   ...state,
                //   newUserState: !state.newUserState,
                // });

                dispatch(createNewUserState());
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
                  // console.log(userContact);
                  createContact(userData._id, userContact);
                }}
                disabled={disAbleButton}
                style={
                  !disAbleButton
                    ? {}
                    : {
                        cursor: "not-allowed",
                      }
                }
              >
                {disAbleButton ? (
                  <ClipLoader color="#00bfa5" css={override} size={20} />
                ) : (
                  "Add contact"
                )}
              </button>
            </form>
          </div>
          <ToastContainer />
        </div>
      </aside>
    </>
  );
};

export default CreateContacts;
