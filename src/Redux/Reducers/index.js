import { combineReducers } from "redux";
import fetchContactList from "./fetchContactList";
import MessageReducer from "./MessagesReducer";
import createUser from "./createUser";
import LoginValidator from "./LoginValidator";
import groupData from "./groupReducer";
import groupMessages from "./GroupMessages";
import fetchFullContactList from "./fetchFullContactList";
const rootReducer = combineReducers({
  fetchContactList,
  MessageReducer,
  createUser,
  LoginValidator,
  fetchFullContactList,
  groupData,
  groupMessages,
});
export default rootReducer;
