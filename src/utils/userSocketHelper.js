import Cookie from "universal-cookie";
import socket from "../socket";
import { getAllMessages } from "../Redux/Actions/MessagesAction";
import { fetchContactList } from "../Redux/Actions/fetchUser";
import { store } from "../index";
let cookie = new Cookie();
let userData = cookie.get("userData");

socket.on("demo", (id, userDetails) => {
  store.dispatch(getAllMessages(userDetails.userData, userDetails.userId));
  store.dispatch(fetchContactList(userData));
});
