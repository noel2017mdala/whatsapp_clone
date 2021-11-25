import axios from "axios";
import { generateToken } from "utils/generateToken";
import { getUserDAta } from "utils/userData";
export const GET_GROUP_INFO = "GET_GROUP_INFO";
export const GET_GROUP_MESSAGES = "GET_GROUP_MESSAGES";
export const GET_COMMON_GROUPS = "GET_COMMON_GROUPS";
let { REACT_APP_SERVER_URL } = process.env;
export const getGroupData = (id) => {
  if (id) {
    let url = `${REACT_APP_SERVER_URL}api/v1/group/getGroup/${id}`;

    // return async (dispatch) => {
    //   const response = await fetch(url);
    //   const resData = await response.json();
    //   let data = resData;

    //   dispatch({ type: GET_GROhttp://localhost:8000/UP_INFO, payLoad: data });
    // };

    return async (dispatch) => {
      axios
        .get(url, {
          headers: {
            "access-token": generateToken(),
            "user-id": getUserDAta()._id,
          },
        })
        .then((res) => {
          if (res.data) {
            dispatch({ type: GET_GROUP_INFO, payLoad: res.data });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }
};

export const getGroupMessages = (id) => {
  if (id) {
    let url = `${REACT_APP_SERVER_URL}api/v1/group/chat/getMessages/${id}`;

    return async (dispatch) => {
      axios
        .get(url, {
          headers: {
            "access-token": generateToken(),
            "user-id": getUserDAta()._id,
          },
        })
        .then((res) => {
          if (res.data) {
            // console.log(res.data);
            dispatch({ type: GET_GROUP_MESSAGES, payLoad: res.data });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }
};

export const getCommonGroups = (ids) => {
  const { id, senderId } = ids;
  if (ids) {
    let url = `${REACT_APP_SERVER_URL}api/v1/group/commonGroup/${senderId}/${id}`;

    return async (dispatch) => {
      axios
        .get(url, {
          headers: {
            "access-token": generateToken(),
            "user-id": getUserDAta()._id,
          },
        })
        .then((res) => {
          if (res.data) {
            // console.log(res.data);
            dispatch({ type: GET_COMMON_GROUPS, payLoad: res.data });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }
};
