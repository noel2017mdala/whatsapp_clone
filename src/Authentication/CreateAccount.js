import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { createUser } from "Redux/Actions/createUser";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import "react-toastify/dist/ReactToastify.css";
import { validate as validateEmail } from "react-email-validator";
const CreateAccount = (props) => {
  const { state, method } = props.tabs;
  const regEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const [uiState, setUi] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const override = css`
    display: block;
    border-color: #ffffff;
  `;

  const [errorState, setErrorState] = useState({
    nameErr: false,
    emailErr: false,
    phoneNumberErr: false,
    passwordErr: false,
  });

  const [loginState, setLoginState] = useState(false);

  const [specChar, setSpecChar] = useState({
    nameErr: false,
    passwordErr: false,
  });

  const validate = (input) => {
    if (/^\s/.test(input.target.value) && input.target.value !== undefined) {
      input.target.value = "";
    }
  };

  const validateForm = async (e) => {
    e.preventDefault();
    setLoginState(true);
    if (
      uiState.name === "" &&
      uiState.email === "" &&
      uiState.phoneNumber === "" &&
      uiState.password === ""
    ) {
      setErrorState({
        ...errorState,
        nameErr: true,
        emailErr: true,
        phoneNumberErr: true,
        passwordErr: true,
      });
      setLoginState(false);
    } else if (uiState.name === "") {
      setErrorState({
        ...errorState,
        nameErr: true,
        emailErr: false,
        phoneNumberErr: false,
        passwordErr: false,
      });
      setLoginState(false);
    } else if (uiState.email === "") {
      setErrorState({
        ...errorState,
        nameErr: false,
        emailErr: true,
        phoneNumberErr: false,
        passwordErr: false,
      });
      setLoginState(false);
    } else if (uiState.phoneNumber === "") {
      setErrorState({
        ...errorState,
        nameErr: false,
        emailErr: false,
        phoneNumberErr: true,
        passwordErr: false,
      });
      setLoginState(false);
    } else if (uiState.password === "") {
      setErrorState({
        ...errorState,
        nameErr: false,
        emailErr: false,
        phoneNumberErr: false,
        passwordErr: true,
      });
      setLoginState(false);
    } else if (!regEx.test(uiState.phoneNumber)) {
      setErrorState({
        ...errorState,
        nameErr: false,
        emailErr: false,
        phoneNumberErr: true,
        passwordErr: false,
      });
      setLoginState(false);
    } else if (validateEmail(uiState.email) === false) {
      setErrorState({
        ...errorState,
        nameErr: false,
        emailErr: true,
        phoneNumberErr: false,
        passwordErr: false,
      });
      setLoginState(false);
    } else if (uiState.name.length < 4) {
      setSpecChar({
        ...specChar,
        nameErr: true,
      });
      setLoginState(false);
    } else if (uiState.password.length < 5) {
      setSpecChar({
        ...specChar,
        passwordErr: true,
      });
      setLoginState(false);
    } else {
      let response = await createUser(uiState);

      if (response.status) {
        if (
          response.message ===
          "The Email or Phone number is already registered with another user"
        ) {
          setUi({
            ...uiState,
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
          });
          setLoginState(false);
          notify.fail(response.message);
        } else {
          notify.success(response.message);

          setTimeout(() => {
            method({
              ...state,
              login: true,
              createAccount: false,
            });
          }, 2000);
        }
      } else {
        setUi({
          ...uiState,
          name: "",
          email: "",
          phoneNumber: "",
          password: "",
        });
        notify.fail(response.message);
      }
    }
  };
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
  return (
    <div className="w-full sm:max-w-xs md:max-w-md m-auto pb-4">
      <form className="bg-white rounded px-8 pt-6 pb-8 mb-4 dark:bg-darkSecondary">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 uppercase dark:text-white">
            User name
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
                    errorState.nameErr
                      ? ` border-solid
                  border-red-500
                    border-3`
                      : null
                  }
                  
                `}
            type="text"
            value={uiState.name}
            placeholder="User Name"
            onInput={validate}
            onChange={(e) => {
              if (errorState.nameErr) {
                setErrorState({
                  ...errorState,
                  nameErr: false,
                  emailErr: false,
                  phoneNumberErr: false,
                  passwordErr: false,
                });
              }

              if (specChar.nameErr) {
                setSpecChar({
                  ...specChar,
                  nameErr: false,
                  passwordErr: false,
                });
              }

              setUi({
                ...uiState,
                name: e.target.value,
              });
            }}
          />
        </div>

        <p className="text-red-500 text-sm italic">
          {errorState.nameErr && !specChar.nameErr
            ? "Please enter a your user name."
            : !errorState.nameErr && specChar.nameErr
            ? "USER NAME should not be less the 4 characters"
            : null}
        </p>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 uppercase dark:text-white">
            Email
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
               dark:text-white
               focus:outline-none focus:shadow-outline

               ${
                 errorState.emailErr
                   ? ` border-solid
               border-red-500
                 border-3`
                   : null
               }
               
             `}
            type="email"
            value={uiState.email}
            placeholder="Email"
            onInput={validate}
            onChange={(e) => {
              if (errorState.emailErr) {
                setErrorState({
                  ...errorState,
                  nameErr: false,
                  emailErr: false,
                  phoneNumberErr: false,
                  passwordErr: false,
                });
              }

              setUi({
                ...uiState,
                email: e.target.value,
              });
            }}
          />
        </div>
        <p className="text-red-500 text-sm italic">
          {errorState.emailErr ? "Please enter a Valid email address." : null}
        </p>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 uppercase dark:text-white">
            Contact
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
            dark:text-white
            focus:outline-none focus:shadow-outline

            ${
              errorState.phoneNumberErr
                ? ` border-solid
            border-red-500
              border-4`
                : null
            }
            
          `}
            type="text"
            value={uiState.phoneNumber}
            placeholder="Phone Number"
            onInput={validate}
            onChange={(e) => {
              if (errorState.phoneNumberErr) {
                setErrorState({
                  ...errorState,
                  nameErr: false,
                  emailErr: false,
                  phoneNumberErr: false,
                  passwordErr: false,
                });
              }

              setUi({
                ...uiState,
                phoneNumber: e.target.value,
              });
            }}
          />
        </div>

        <p className="text-red-500 text-sm italic">
          {errorState.phoneNumberErr
            ? "Please enter a valid Phone number."
            : null}
        </p>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 uppercase dark:text-white">
            Password
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
       dark:text-white
       leading-tight
       focus:outline-none focus:shadow-outline

       ${
         errorState.passwordErr
           ? ` border-solid
       border-red-500
         border-3`
           : null
       }
       
     `}
            type="password"
            value={uiState.password}
            placeholder="******************"
            onInput={validate}
            onChange={(e) => {
              if (errorState.passwordErr) {
                setErrorState({
                  ...errorState,
                  nameErr: false,
                  emailErr: false,
                  phoneNumberErr: false,
                  passwordErr: false,
                });
              }

              if (specChar.passwordErr) {
                setSpecChar({
                  ...specChar,
                  nameErr: false,
                  passwordErr: false,
                });
              }

              setUi({
                ...uiState,
                password: e.target.value,
              });
            }}
          />
        </div>
        <p className="text-red-500 text-sm italic pb-3">
          {errorState.passwordErr && !specChar.passwordErr
            ? "Please enter your Password."
            : !errorState.passwordErr && specChar.passwordErr
            ? "PASSWORD should not be less than 6 characters"
            : null}
        </p>
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
            onClick={validateForm}
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
              "Create Account"
            )}
          </button>
          <a
            className="
                  inline-block
                  align-baseline
                  font-bold
                  text-sm text-blue-500
                  hover:text-blue-800
                  cursor-pointer
                "
            onClick={() => {
              method({
                ...state,
                login: true,
                createAccount: false,
              });
            }}
          >
            Log In ?
          </a>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateAccount;
