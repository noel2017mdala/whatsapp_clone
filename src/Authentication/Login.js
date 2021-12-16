import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "Redux/Actions/createUser";
import { ToastContainer, toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const Login = () => {
  const [loginState, setLoginState] = useState(false);

  const regEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const dispatch = useDispatch();

  const [uiState, setUi] = useState({
    email: "",
    password: "",
  });

  const [errorState, setErrorState] = useState({
    phoneNumberErr: false,
    passwordErr: false,
  });
  let notify = {
    success: (message) => {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },

    fail: (message) => {
      toast.error(message, {
        position: "top-right",
        autoClose: 9000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  };

  const validateLogin = (e) => {
    e.preventDefault();
    setLoginState(true);
    if (uiState.email === "" && uiState.password === "") {
      setErrorState({
        phoneNumberErr: true,
        passwordErr: true,
      });
      setLoginState(false);
    } else if (uiState.email === "") {
      setErrorState({
        phoneNumberErr: true,
      });
      setLoginState(false);
    } else if (uiState.password === "") {
      setErrorState({
        passwordErr: true,
      });
      setLoginState(false);
    } else if (!regEx.test(uiState.email)) {
      setErrorState({
        ...errorState,
        phoneNumberErr: true,
      });
      setLoginState(false);
    } else {
      dispatch(
        logIn(uiState, (result) => {
          console.log(result);
          if (result) {
            notify.success("Login Success");
            setUi((prevState) => ({
              ...prevState,
              email: "",
              password: "",
            }));
          } else {
            notify.fail("There was a problem with your login please try again");
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

  const override = css`
    display: block;
    border-color: #ffffff;
  `;

  const validate = (input) => {
    if (/^\s/.test(input.target.value) && input.target.value !== undefined) {
      input.target.value = "";
    }
  };
  return (
    <>
      {select.LoginValidator ? (
        window.location.reload()
      ) : (
        <div className="w-full sm:max-w-xs md:max-w-md m-auto pb-4">
          <form className="bg-white rounded px-8 pt-6 pb-8 mb-4 dark:bg-darkSecondary">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 uppercase dark:text-white">
                phone number
              </label>
              <input
                className={`
                  shadow
                  appearance-none
                  border
                  rounded
                  w-full
                  py-3
                  px-3
                  text-gray-500
                  leading-tight
                  focus:outline-none focus:shadow-outline
                  dark:text-white
                  dark:shadow-lg

                  ${
                    errorState.phoneNumberErr
                      ? ` border-solid
                  border-red-500
                    border-3`
                      : null
                  }
  `}
                id="username"
                type="text"
                value={uiState.email}
                placeholder="phone number"
                onInput={validate}
                onChange={(e) => {
                  setUi({
                    ...uiState,
                    email: e.target.value,
                  });

                  setErrorState({
                    ...errorState,
                    phoneNumberErr: false,
                    passwordErr: false,
                  });
                }}
              />

              <p className="text-red-500 text-sm italic pt-3">
                {errorState.phoneNumberErr
                  ? "Please enter a valid Phone number."
                  : null}
              </p>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2 uppercase dark:text-white">
                Password
              </label>
              <input
                className={`
                  shadow
                  appearance-none
                  // border border-red-500
                  rounded
                  w-full
                  py-3
                  px-3
                  text-gray-500
                  mb-3
                  leading-tight
                  focus:outline-none 
                  focus:shadow-outline
                  dark:text-white
                  

                  ${
                    errorState.passwordErr
                      ? ` border-solid
                  border-red-500
                    border-3`
                      : null
                  }
                `}
                id="password"
                type="password"
                value={uiState.password}
                placeholder="******************"
                onInput={validate}
                onChange={(e) => {
                  setUi({
                    ...uiState,
                    password: e.target.value,
                  });

                  setErrorState({
                    ...errorState,
                    phoneNumberErr: false,
                    passwordErr: false,
                  });
                }}
              />
              <p className="text-red-500 text-sm italic pt-3">
                {errorState.passwordErr
                  ? "Please enter a valid password."
                  : null}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="
                  bg-main
                  text-white
                  font-bold
                  py-2
                  px-4
                  rounded
                  focus:outline-none focus:shadow-outline
                  shadow
                hover:bg-mainHover"
                type="button"
                onClick={validateLogin}
                disabled={loginState ? "disabled" : ""}
                style={
                  loginState
                    ? {
                        cursor: "not-allowed",
                      }
                    : null
                }
              >
                {loginState ? (
                  <ClipLoader color="#FFFFFF" css={override} size={30} />
                ) : (
                  "Sign In"
                )}
              </button>
              <a
                className="
                  inline-block
                  align-baseline
                  font-bold
                  text-sm text-blue-500
                  hover:text-blue-800
                "
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Login;
