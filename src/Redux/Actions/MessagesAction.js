import axios from "axios";
import { generateToken } from "utils/generateToken";
import { getUserDAta } from "utils/userData";
import socket from "../../socket/index";
export const GET_LAST_MESSAGE = "GET_LAST_MESSAGE";
export const GET_ALL_MESSAGE = "GET_ALL_MESSAGE";
let { REACT_APP_SERVER_URL } = process.env;

export const getLastMessage = (myId, id) => {
  let userId = myId._id;
  if (id) {
    const url = `${REACT_APP_SERVER_URL}api/v1/chat/getFilteredMessages/${userId}/${id}`;
    return async (dispatch) => {
      const response = await fetch(url, {
        headers: {
          "access-token": generateToken(),
          "user-id": getUserDAta()._id,
        },
      });
      const resData = await response.json();
      let data = resData;

      dispatch({ type: GET_LAST_MESSAGE, payLoad: data });
    };
  }
};

export const getAllMessages = (myId, id) => {
  let userId = myId._id;
  if (id) {
    const url = `${REACT_APP_SERVER_URL}api/v1/chat/getAllMessages/${userId}/${id}`;
    return async (dispatch) => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "access-token": generateToken(),
          "user-id": getUserDAta()._id,
        },
      });
      const resData = await response.json();
      let data = resData;

      dispatch({ type: GET_ALL_MESSAGE, payLoad: data });
    };
  }
};

export const setUserChat = (id, senderId) => {
  return async (dispatch) => {
    const url = `${REACT_APP_SERVER_URL}api/v1/chat/setUserUnread`;
    axios
      .post(
        url,
        {
          userId: id,
          senderId,
        },
        {
          headers: {
            "access-token": generateToken(),
            "user-id": getUserDAta()._id,
          },
        }
      )
      .then((res) => {
        if (res.data.updateUserCounter.ok) {
          //  console.log(res.data.getMessages[0]);
          socket.emit("request-demo", res.data.getMessages[0]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
