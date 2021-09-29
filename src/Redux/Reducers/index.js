import { combineReducers } from "redux";
import fetchContactList from "./fetchContactList";
import MessageReducer from "./MessagesReducer";
import createUser from "./createUser";
const rootReducer = combineReducers({
  fetchContactList,
  MessageReducer,
  createUser,
});
export default rootReducer;
