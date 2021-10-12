import { combineReducers } from "redux";
import fetchContactList from "./fetchContactList";
import MessageReducer from "./MessagesReducer";
import createUser from "./createUser";
import LoginValidator from "./LoginValidator";
import fetchFullContactList from "./fetchFullContactList";
const rootReducer = combineReducers({
  fetchContactList,
  MessageReducer,
  createUser,
  LoginValidator,
  fetchFullContactList,
});
export default rootReducer;
