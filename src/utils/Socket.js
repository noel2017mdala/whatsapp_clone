import socket from "../socket";
import { getUserDAta } from "./userData";

export const emitMessage = (message, id) => {
  socket.emit(message, getUserDAta(), id);
};
