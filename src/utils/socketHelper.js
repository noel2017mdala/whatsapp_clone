import Cookie from "universal-cookie";
import { getAllMessages } from "../Redux/Actions/MessagesAction";
import { fetchContactList } from "../Redux/Actions/fetchUser";
import { store } from "../index";
import socket from "../socket";
let cookie = new Cookie();
let userData = cookie.get("userData");

socket.on("receive-message", (message, data) => {
  sendMessage(message.messagesBody, data);
});
const sendMessage = (data, userDetails) => {
  // console.log(userDetails.userData);
  // console.log(userData);
  store.dispatch(getAllMessages(userDetails.userData, userDetails.userId));
  store.dispatch(fetchContactList(userData));
  socket.emit("refresh-user");
};
