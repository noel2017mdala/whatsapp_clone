import Cookie from "universal-cookie";
import socket from "../socket";
import { getAllMessages } from "../Redux/Actions/MessagesAction";
import { fetchContactList } from "../Redux/Actions/fetchUser";
import { store } from "../index";
let cookie = new Cookie();
let userData = cookie.get("userData");
let messageNotification = new Audio(
  "http://localhost:8000/public/audio/messageSending.mp3"
);

messageNotification.load();
socket.on("demo", (id, userDetails) => {
  store.dispatch(getAllMessages(userDetails.userData, userDetails.userId));
  store.dispatch(fetchContactList(userData));
  messageNotification.play();
});

socket.on("re-fresh-contact", (data) => {
  store.dispatch(fetchContactList(userData));
});
