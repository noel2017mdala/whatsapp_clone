import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "Redux/Actions/createUser";
const Login = () => {
  //dispatch variable
  const dispatch = useDispatch();

  const [uiState, setUi] = useState({
    email: "",
    password: "",
  });

  let handleForm = (e) => {
    e.preventDefault();
    // console.log(uiState);
    dispatch(logIn(uiState));
  };
  return (
    <div className="formContainer">
      <form>
        <label for="phone number">Phone Number</label>
        <input
          type="number"
          name="email"
          placeholder="Email or Number"
          onChange={(e) => {
            setUi((prevState) => ({
              ...prevState,
              email: e.target.value,
            }));
          }}
        />
        <label for="password">Password</label>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
