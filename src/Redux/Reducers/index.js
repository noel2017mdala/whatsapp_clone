import { combineReducers } from "redux";
import fetchContactList from "./fetchContactList";
import MessageReducer from "./MessagesReducer";
import createUser from "./createUser";
import LoginValidator from "./LoginValidator";
import groupData from "./groupReducer";
import commonGroups from "./commonGroupsReducer";
import groupMessages from "./GroupMessages";
import fetchFullContactList from "./fetchFullContactList";
import sideBarReducer from "./sideBarReducer";
import userState from "./UserState";
const rootReducer = combineReducers({
  fetchContactList,
  MessageReducer,
  createUser,
  LoginValidator,
  fetchFullContactList,
  groupData,
  groupMessages,
  commonGroups,
  sideBarReducer,
  userState,
});
export default rootReducer;
