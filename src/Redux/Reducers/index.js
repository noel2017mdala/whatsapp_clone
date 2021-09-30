import { combineReducers } from "redux";
import fetchContactList from "./fetchContactList";
import MessageReducer from "./MessagesReducer";
import createUser from "./createUser";
import LoginValidator from "./LoginValidator";
const rootReducer = combineReducers({
  fetchContactList,
  MessageReducer,
  createUser,
  LoginValidator,
});
export default rootReducer;
