import { io } from "socket.io-client";
import Cookie from "universal-cookie";
let { REACT_APP_SERVER_URL } = process.env;
let cookie = new Cookie();
let header = cookie.get("userPayLoad");
let userData = cookie.get("userData");
// console.log(userData);

let socket = io(`${REACT_APP_SERVER_URL}`, {
  transports: ["websocket"],
  query: `userId=${!userData ? null : !userData._id ? null : userData._id}`,
});

export default socket;
