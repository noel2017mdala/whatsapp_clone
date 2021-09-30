import { LOGIN, LOGOUT } from "../Actions/createUser";

const LoginValidator = (state = false, action) => {
  switch (action.type) {
    case "LOGIN":
      return (state = true);
    case "LOGOUT":
      return (state = false);
    default:
      return state;
  }
};

export default LoginValidator;
