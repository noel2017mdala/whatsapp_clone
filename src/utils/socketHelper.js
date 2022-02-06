import Cookie from "universal-cookie";
import { getAllMessages } from "../Redux/Actions/MessagesAction";
import { fetchContactList } from "../Redux/Actions/fetchUser";
import { store } from "../index";
import socket from "../socket";
let cookie = new Cookie();
let userData = cookie.get("userData");
let { REACT_APP_SERVER_URL } = process.env;
let messageNotification = new Audio(
  `${REACT_APP_SERVER_URL}public/audio/messageNotification.mp3`
);
messageNotification.load();
socket.on("receive-message", (message, data) => {
  sendMessage(message.messagesBody, data);
});
const sendMessage = (data, userDetails) => {
  // console.log(userDetails.userData);
  // console.log(userData);
  // console.log("i have received a message");
  // messageNotification.play();
  store.dispatch(getAllMessages(userDetails.userData, userDetails.userId));
  store.dispatch(fetchContactList(userData));
  // socket.emit("refresh-user");
};
