import { io } from "socket.io-client";
import Cookie from "universal-cookie";

let cookie = new Cookie();
let header = cookie.get("userPayLoad");
let userData = cookie.get("userData");

let socket = io("http://localhost:8000", {
  transports: ["websocket"],
  query: `userId=${userData._id ? userData._id : ""}`,
});

export default socket;
