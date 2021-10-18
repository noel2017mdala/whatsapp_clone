import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "Redux/Actions/createUser";
const CreateAccount = () => {
  //dispatch variable
  const dispatch = useDispatch();

  const [uiState, setUi] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  let handleForm = (e) => {
    e.preventDefault();
    // console.log(uiState);
    dispatch(createUser(uiState));
  };

  return (
    <div className="formContainer">
      <form>
        <label>User Name</label>
        <input
          type="text"
          name="name"
          placeholder="user name"
          onChange={(e) => {
            setUi((prevState) => ({
              ...prevState,
              name: e.target.value,
            }));
          }}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => {
            setUi((prevState) => ({
              ...prevState,
              email: e.target.value,
            }));
          }}
        />
        <label>Phone Number</label>
        <input
          type="number"
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={(e) => {
            setUi((prevState) => ({
              ...prevState,
              phoneNumber: e.target.value,
            }));
          }}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => {
            setUi((prevState) => ({
              ...prevState,
              password: e.target.value,
            }));
          }}
        />
        <button type="submit" onClick={handleForm}>
          create Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
