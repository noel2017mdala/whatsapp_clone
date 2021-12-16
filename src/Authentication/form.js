import React, { useState } from "react";

import Login from "./Login";
import CreateAccount from "./CreateAccount";
import qrCode from "./icons/qrcode.png";
const Form = () => {
  const [tabState, changeStabState] = useState({
    login: true,
    createAccount: false,
  });

  return (
    <div
      className="
        sm:w-11/12
        md:w-9/12
        m-auto
        bg-white
        lg:bg-black
        z-10
        relative
        sm:bottom-8
        md:bottom-20
        rounded
        shadow-2xl
        pb-12
        dark:bg-darkSecondary
      "
    >
      <div
        className="
          flex
          sm:flex-col
          md:flex-row
          sm:justify-center sm:items-center
          md:justify-left md:items-left
          
        "
      >
        <div className="order-5 text-left">
          <ul className="sm:text-xl md:text-2xl m-2 p-2 dark:text-white">
            <li className="mb-2">(1) Create an account to use Whatsapp</li>
            <li className="mb-2">(2) Log in to use whatsapp</li>
            <li className="mb-2">(3) you can scan to qrcode to login</li>
            <li className="mb-2">(4) Do not forget to share 😊</li>
          </ul>
        </div>
        <div className="order-5 md:m-2 md:p-2">
          <img
            className="sm:w-max sm:h-80 md:w-full md:h-72 "
            src={qrCode}
            alt=""
          />
        </div>
      </div>

      <div className="md:max-w-md md:m-auto sm:px-3 shadow-2xl rounded ">
        {tabState.login ? (
          <h1 className="sm:text-xl md:text-2xl font-bold text-center dark:text-white">
            Log in
          </h1>
        ) : (
          <h1 className="sm:text-xl md:text-2xl font-bold text-center dark:text-white">
            Create Account
          </h1>
        )}
        <nav className="tabs flex flex-row pt-6 my-2 dark:text-white">
          <button
            className={`flex-1 ${
              tabState.login
                ? "bg-main sm:py-3 text-white rounded hover:bg-mainHover"
                : ""
            }`}
            onClick={() => {
              changeStabState({
                ...tabState,
                login: true,
                createAccount: false,
              });
            }}
          >
            Login
          </button>
          <button
            className={`flex-1 ${
              tabState.createAccount
                ? "bg-main sm:py-3 text-white rounded hover:bg-mainHover"
                : ""
            }`}
            onClick={() => {
              changeStabState({
                ...tabState,
                login: false,
                createAccount: true,
              });
            }}
          >
            Create Account
          </button>
        </nav>
        {tabState.login ? (
          <Login />
        ) : (
          <CreateAccount
            tabs={{
              state: tabState,
              method: changeStabState,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Form;
