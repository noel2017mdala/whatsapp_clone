import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Redirect } from "react-router-dom";
import { logIn } from "Redux/Actions/createUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    if (uiState.email === "" || uiState.password === "") {
      notifyError("All input values are required");
    } else if (!regEx.test(uiState.email)) {
      notifyError("Please enter a valid phone number");
      setUi((prevState) => ({
        ...prevState,
        email: "",
        password: "",
      }));
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
              "Your username or password is incorrect please try again later"
            );
            setUi((prevState) => ({
              ...prevState,
              email: "",
              password: "",
            }));
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
            <button type="submit" onClick={handleForm}>
              Login
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Login;
