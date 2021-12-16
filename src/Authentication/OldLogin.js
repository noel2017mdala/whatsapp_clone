import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Redirect } from "react-router-dom";
import { logIn } from "Redux/Actions/createUser";
import { ToastContainer, toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/react";
let { REACT_APP_SERVER_URL } = process.env;
const Login = () => {
  //dispatch variable
  const dispatch = useDispatch();
  // const gegEx = /^[+-]?\d*(?:[.,]\d*)?$/;
  // const regEX = /^[0-9]*$/;
  const regEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const [uiState, setUi] = useState({
    email: "",
    password: "",
  });

  const override = css`
    // display: block;
    // margin: 2em auto;
    // border-color: #00bfa5;
  `;

  const [loginState, setLoginState] = useState(false);

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

  const userContact = (e) => {
    setUi((prevState) => ({
      ...prevState,
      email: e.target.value,
    }));
  };

  const userPassword = (e) => {
    setUi((prevState) => ({
      ...prevState,
      password: e.target.value,
    }));
  };
  let handleForm = (e) => {
    e.preventDefault();
    setLoginState(true);
    if (uiState.email === "" || uiState.password === "") {
      notifyError("All input values are required");
      setLoginState(false);
    } else if (!regEx.test(uiState.email)) {
      notifyError("Please enter a valid phone number");
      setUi((prevState) => ({
        ...prevState,
        email: "",
        password: "",
      }));
      setLoginState(false);
    } else {
      dispatch(
        logIn(uiState, (result) => {
          if (result) {
            notifySuccess("Login Success");
            setUi((prevState) => ({
              ...prevState,
              email: "",
              password: "",
            }));
          } else {
            notifyError(
              "There was a problem with your login please try again later."
            );
            setUi((prevState) => ({
              ...prevState,
              email: "",
              password: "",
            }));
            setLoginState(false);
          }
        })
      );
    }
  };

  const select = useSelector((e) => {
    return e;
  });

  return (
    <>
      {select.LoginValidator ? (
        window.location.reload()
      ) : (
        <div className="formContainer">
          <form>
            <label>Phone number</label>
            <input
              type="text"
              name="email"
              value={uiState.email}
              placeholder="Phone number"
              onChange={userContact}
              onPaste={userContact}
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={uiState.password}
              placeholder="password"
              onChange={userPassword}
              onPaste={userPassword}
            />
            <button
              type="submit"
              onClick={handleForm}
              disabled={loginState ? "disabled" : ""}
              style={
                loginState
                  ? {
                      cursor: "not-allowed",
                    }
                  : {}
              }
            >
              {loginState ? (
                <ClipLoader color="#FFFFFF" css={override} size={30} />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Login;
