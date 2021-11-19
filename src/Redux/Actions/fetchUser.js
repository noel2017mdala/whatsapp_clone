import axios from "axios";
export const FETCH_USER_CONTACT_LIST = "FETCH_USER_CONTACT_LIST";
export const FETCH_FULL_CONTACT_LIST = "FETCH_FULL_CONTACT_LIST";
let { REACT_APP_SERVER_URL } = process.env;
export const fetchContactList = (userId) => {
  let id = userId._id;

  const url = `${REACT_APP_SERVER_URL}api/v1/users/getUser/${id}`;
  return async (dispatch) => {
    const response = await fetch(url);
    const resData = await response.json();
    let data = resData;

    dispatch({ type: FETCH_USER_CONTACT_LIST, payLoad: data });
  };
};

export const fetchUserFullContactList = (id) => {
  return async (dispatch) => {
    const url = `${REACT_APP_SERVER_URL}api/v1/users/getContactList/${id}`;
    axios
      .get(url, {
        method: "get",
        responseType: "stream",
      })
      .then((response) => {
        dispatch({ type: FETCH_FULL_CONTACT_LIST, payLoad: response.data });
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const createUser = async (id, body) => {
  const url = `${REACT_APP_SERVER_URL}api/v1/users/addContact/${id}`;
  let test = axios
    .put(url, {
      body,
    })
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      if (err.response) {
        return {
          status: true,
          message: "Failed to add contact please try again later",
        };
      } else if (err.request) {
        return {
          status: true,
          message:
            "Failed to add contact please check your internet connection and try again",
        };
      } else {
        return {
          status: true,
          message:
            "Failed to add contact please check your internet connection and try again",
        };
      }
    });

  return await test;
};
