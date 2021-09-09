import { combineReducers } from "redux";
import fetchContactList from "./fetchContactList";
import MessageReducer from "./MessagesReducer";
const rootReducer = combineReducers({
  fetchContactList,
  MessageReducer,
});
export default rootReducer;
