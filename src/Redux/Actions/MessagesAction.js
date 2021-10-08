import axios from "axios";
import socket from "../../socket/index";
export const GET_LAST_MESSAGE = "GET_LAST_MESSAGE";
export const GET_ALL_MESSAGE = "GET_ALL_MESSAGE";

export const getLastMessage = (myId, id) => {
  let userId = myId._id;
  if (id) {
    const url = `http://localhost:8000/api/v1/chat/getFilteredMessages/${userId}/${id}`;
    return async (dispatch) => {
      const response = await fetch(url);
      const resData = await response.json();
      let data = resData;

      dispatch({ type: GET_LAST_MESSAGE, payLoad: data });
    };
  }
};

export const getAllMessages = (myId, id) => {
  let userId = myId._id;
  if (id) {
    const url = `http://localhost:8000/api/v1/chat/getAllMessages/${userId}/${id}`;
    return async (dispatch) => {
      const response = await fetch(url);
      const resData = await response.json();
      let data = resData;

      dispatch({ type: GET_ALL_MESSAGE, payLoad: data });
    };
  }
};

export const setUserChat = (id, senderId) => {
  return async (dispatch) => {
    const url = `http://localhost:8000/api/v1/chat/setUserUnread`;
    axios
      .post(url, {
        userId: id,
        senderId,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          socket.emit("request-demo");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
