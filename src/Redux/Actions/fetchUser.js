import axios from "axios";
export const FETCH_USER_CONTACT_LIST = "FETCH_USER_CONTACT_LIST";
export const FETCH_FULL_CONTACT_LIST = "FETCH_FULL_CONTACT_LIST";
export const fetchContactList = (userId) => {
  let id = userId._id;

  const url = `http://localhost:8000/api/v1/users/getUser/${id}`;
  return async (dispatch) => {
    const response = await fetch(url);
    const resData = await response.json();
    let data = resData;

    dispatch({ type: FETCH_USER_CONTACT_LIST, payLoad: data });
  };
};

export const fetchUserFullContactList = (id) => {
  return async (dispatch) => {
    const url = `http://localhost:8000/api/v1/users/getContactList/${id}`;
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
