import axios from "axios";
import { generateToken } from "utils/generateToken";
import { getUserDAta } from "utils/userData";
export const NEW_CHAT = "NEW_CHAT";
export const NEW_GROUP = "NEW_GROUP";
export const NEW_USER = "NEW_USER";
export const PROFILE = "PROFILE";
export const ADD_GROUP_USERS = "ADD_GROUP_USERS";
export const NEW_GROUP_LIST = "NEW_GROUP_LIST";
export const CLEAR_UI = "CLEAR_UI";
let { REACT_APP_SERVER_URL } = process.env;

export const getNewChart = () => {
  return (dispatch) => {
    dispatch({
      type: NEW_CHAT,
    });
  };
};

export const createNewUserState = () => {
  return (dispatch) => {
    dispatch({
      type: NEW_USER,
    });
  };
};

export const createGroupState = () => {
  return (dispatch) => {
    dispatch({
      type: NEW_GROUP,
    });
  };
};

export const getUserProfile = () => {
  return (dispatch) => {
    dispatch({
      type: PROFILE,
    });
  };
};

export const newGroupList = (data) => {
  if (data) {
    let id = data._id;
    const url = `${REACT_APP_SERVER_URL}api/v1/group/getGroupUsers/${id}`;
    return async (dispatch) => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "access-token": generateToken(),
          "user-id": getUserDAta()._id,
        },
      });
      const resData = await response.json();
      let data = { resData, groupId: id };

      dispatch({ type: NEW_GROUP_LIST, payLoad: data });
    };
  } else {
    return (dispatch) => {
      dispatch({
        type: NEW_GROUP_LIST,
        payLoad: [],
      });
    };
  }
};

export const clearGroupList = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_UI,
    });
  };
};

export const addUserToGroup = (users, cb) => {
  return async (dispatch) => {
    if (users) {
      let url = `${REACT_APP_SERVER_URL}api/v1/group/addUsersToGroup/`;
      let addUser = axios
        .post(
          url,
          {
            users,
          },
          {
            headers: {
              "access-token": generateToken(),
              "user-id": getUserDAta()._id,
            },
          }
        )
        .then((res) => {
          cb(res.data);
          console.log(res.data);
          return res.data;
        })
        .catch((e) => {
          cb({
            status: false,
            message: "Failed to add user to the group",
          });
        });
    }
  };
};
