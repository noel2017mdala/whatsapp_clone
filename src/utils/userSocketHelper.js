import Cookie from "universal-cookie";
import socket from "../socket";
import { getAllMessages } from "../Redux/Actions/MessagesAction";
import { fetchContactList } from "../Redux/Actions/fetchUser";

import { getGroupData, getGroupMessages } from "../Redux/Actions/groupAction";
import { store } from "../index";
import { emitMessage } from "./Socket";
let cookie = new Cookie();
let userData = cookie.get("userData");
let { REACT_APP_SERVER_URL } = process.env;
let messageNotification = new Audio(
  `${REACT_APP_SERVER_URL}public/audio/messageSending.mp3`
);

let messageReceiveNotification = new Audio(
  `${REACT_APP_SERVER_URL}public/audio/messageNotification.mp3`
);

messageReceiveNotification.load();
messageNotification.load();
socket.on("demo", (id, userDetails) => {
  store.dispatch(getAllMessages(userDetails.userData, userDetails.userId));
  store.dispatch(fetchContactList(userData));
  // messageNotification.play();
});

socket.on("demoBroadcast", (id, userDetails) => {
  store.dispatch(getAllMessages(userDetails.userData, userDetails.userId));
  store.dispatch(fetchContactList(userData));
});

socket.on("re-fresh-contact", (data) => {
  store.dispatch(fetchContactList(userData));
});

socket.on("receive-group-message", (message) => {
  store.dispatch(getGroupData(message.data.to));
  store.dispatch(getGroupMessages(message.data.to));
});

socket.on("receive-group-message-notification", (data) => {
  // messageReceiveNotification.play();
});

socket.on("user_receive_sent_message", (data) => {
  emitMessage("response_emit", data.id);
});

socket.on("updateList", (body) => {
  store.dispatch(getAllMessages(body.data, body.id));
  store.dispatch(fetchContactList(body.data));
});
