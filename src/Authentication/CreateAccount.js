import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "Redux/Actions/createUser";
import { ToastContainer, toast } from "react-toastify";
import { validate } from "react-email-validator";
import "react-toastify/dist/ReactToastify.css";
const CreateAccount = (props) => {
  let { state, method } = props.state;
  //dispatch variable
  const dispatch = useDispatch();
  const regEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

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

  const [uiState, setUi] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  let handleForm = async (e) => {
    setUi({
      ...uiState,
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    });
    e.preventDefault();
    if (
      uiState.name === "" ||
      uiState.email === "" ||
      uiState.phoneNumber === "" ||
      uiState.password === ""
    ) {
      notify.fail("All inputs are required");
    } else if (validate(uiState.email) === false) {
      notify.fail("Please enter a valid email");
    } else if (uiState.phoneNumber.length < 10) {
      notify.fail("Please enter a valid phone number");
    } else if (!regEx.test(uiState.phoneNumber)) {
      notify.fail("Please enter a valid phone number");
    } else {
      // dispatch(createUser(uiState));
      let response = await createUser(uiState);
      if (response.status) {
        notify.success(response.message);
        setTimeout(() => {
          if (state === 1) {
            method(0);
          } else {
            method(0);
          }
        }, 3000);
      } else {
        notify.fail(response.message);
      }
    }
  };

  return (
    <div className="formContainer">
      <form>
        <label>User Name</label>
        <input
          type="text"
          name="name"
          value={uiState.name}
          placeholder="user name"
          onChange={(e) => {
            setUi((prevState) => ({
              ...prevState,
              name: e.target.value,
            }));
          }}
          required="required"
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={uiState.email}
          placeholder="Email"
          onChange={(e) => {
            setUi((prevState) => ({
              ...prevState,
              email: e.target.value,
            }));
          }}
          required="required"
        />
        <label>Phone Number</label>
        <input
          type="number"
          name="phoneNumber"
          value={uiState.phoneNumber}
          placeholder="Phone Number"
          onChange={(e) => {
            setUi((prevState) => ({
              ...prevState,
              phoneNumber: e.target.value,
            }));
          }}
          required="required"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={uiState.password}
          placeholder="password"
          onChange={(e) => {
            setUi((prevState) => ({
              ...prevState,
              password: e.target.value,
            }));
          }}
          required="required"
        />
        <button type="submit" onClick={handleForm}>
          create Account
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateAccount;
