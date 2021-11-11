import Cookie from "universal-cookie";
import socket from "../socket";
import { getAllMessages } from "../Redux/Actions/MessagesAction";
import { fetchContactList } from "../Redux/Actions/fetchUser";
import { getGroupData, getGroupMessages } from "../Redux/Actions/groupAction";
import { store } from "../index";
let cookie = new Cookie();
let userData = cookie.get("userData");
let messageNotification = new Audio(
  "http://localhost:8000/public/audio/messageSending.mp3"
);

let messageReceiveNotification = new Audio(
  "http://localhost:8000/public/audio/messageNotification.mp3"
);

messageReceiveNotification.load();
messageNotification.load();
socket.on("demo", (id, userDetails) => {
  store.dispatch(getAllMessages(userDetails.userData, userDetails.userId));
  store.dispatch(fetchContactList(userData));
  messageNotification.play();
});

socket.on("re-fresh-contact", (data) => {
  store.dispatch(fetchContactList(userData));
});

socket.on("receive-group-message", (message) => {
  store.dispatch(getGroupData(message.data.to));
  store.dispatch(getGroupMessages(message.data.to));
});

socket.on("receive-group-message-notification", (data) => {
  messageReceiveNotification.play();
});
